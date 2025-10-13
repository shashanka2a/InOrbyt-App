import { Prisma } from '@prisma/client';
import { prisma } from './client';
import { syncBlockchainEvent, processTokenTransaction, updateTokenStats } from './blockchain-sync';
import { sendNotification } from './notifications';
import { logActivity } from './audit';

/**
 * Prisma Middleware Architecture for InOrbyt
 * Handles blockchain integration, notifications, and data consistency
 */

// ===== CORE MIDDLEWARE SETUP =====

export function setupPrismaMiddleware() {
  // User creation middleware
  prisma.$use(async (params, next) => {
    if (params.model === 'User' && params.action === 'create') {
      const result = await next(params);
      
      // Create creator profile if user is a creator
      if (result.isCreator) {
        await prisma.creatorProfile.create({
          data: {
            userId: result.id,
            isPublic: true,
          },
        });
      }
      
      // Send welcome notification
      await sendNotification({
        userId: result.id,
        type: 'SYSTEM_UPDATE',
        title: 'Welcome to InOrbyt!',
        message: 'Your account has been created successfully.',
      });
      
      return result;
    }
    
    return next(params);
  });

  // Token creation middleware
  prisma.$use(async (params, next) => {
    if (params.model === 'CreatorToken' && params.action === 'create') {
      const result = await next(params);
      
      // Initialize token stats
      await updateTokenStats(result.id);
      
      // Create default perks based on creator preferences
      await createDefaultPerks(result.creatorId, result.id);
      
      // Log token creation
      await logActivity({
        type: 'TOKEN_CREATED',
        userId: result.creatorId,
        metadata: {
          tokenId: result.id,
          tokenSymbol: result.symbol,
        },
      });
      
      return result;
    }
    
    return next(params);
  });

  // Transaction creation middleware
  prisma.$use(async (params, next) => {
    if (params.model === 'Transaction' && params.action === 'create') {
      const result = await next(params);
      
      // Process blockchain transaction
      if (result.txHash) {
        await processTokenTransaction(result);
      }
      
      // Update token stats
      if (result.tokenId) {
        await updateTokenStats(result.tokenId);
      }
      
      // Send notification
      await sendNotification({
        userId: result.userId,
        type: 'TRANSACTION_CONFIRMED',
        title: 'Transaction Confirmed',
        message: `Your ${result.type.toLowerCase()} has been confirmed.`,
        data: { transactionId: result.id },
      });
      
      return result;
    }
    
    return next(params);
  });

  // Wallet connection middleware
  prisma.$use(async (params, next) => {
    if (params.model === 'Wallet' && params.action === 'create') {
      const result = await next(params);
      
      // Send wallet connected notification
      await sendNotification({
        userId: result.userId,
        type: 'WALLET_CONNECTED',
        title: 'Wallet Connected',
        message: `Your ${result.walletType} wallet has been connected successfully.`,
      });
      
      return result;
    }
    
    return next(params);
  });

  // Perk redemption middleware
  prisma.$use(async (params, next) => {
    if (params.model === 'PerkRedemption' && params.action === 'create') {
      const result = await next(params);
      
      // Update perk redemption count
      await prisma.perk.update({
        where: { id: result.perkId },
        data: { currentRedemptions: { increment: 1 } },
      });
      
      // Send redemption notification
      await sendNotification({
        userId: result.userId,
        type: 'PERK_REDEMPTION',
        title: 'Perk Redeemed',
        message: 'You have successfully redeemed a perk!',
        data: { redemptionId: result.id },
      });
      
      return result;
    }
    
    return next(params);
  });
}

// ===== BLOCKCHAIN INTEGRATION MIDDLEWARE =====

export async function handleBlockchainEvent(event: {
  eventType: string;
  contractAddress: string;
  blockNumber: number;
  transactionHash: string;
  logIndex: number;
  data: any;
}) {
  try {
    // Store the event
    const storedEvent = await prisma.blockchainEvent.create({
      data: {
        eventType: event.eventType,
        contractAddress: event.contractAddress,
        blockNumber: BigInt(event.blockNumber),
        transactionHash: event.transactionHash,
        logIndex: event.logIndex,
        data: event.data,
      },
    });

    // Process based on event type
    switch (event.eventType) {
      case 'TokenTransfer':
        await handleTokenTransfer(event);
        break;
      case 'TokenPurchase':
        await handleTokenPurchase(event);
        break;
      case 'PerkRedeemed':
        await handlePerkRedemption(event);
        break;
      case 'PriceUpdate':
        await handlePriceUpdate(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.eventType}`);
    }

    // Mark as processed
    await prisma.blockchainEvent.update({
      where: { id: storedEvent.id },
      data: { processed: true },
    });

  } catch (error) {
    console.error('Error processing blockchain event:', error);
    throw error;
  }
}

// ===== EVENT HANDLERS =====

async function handleTokenTransfer(event: any) {
  const { from, to, value, tokenId } = event.data;
  
  // Update token holdings
  if (from !== '0x0000000000000000000000000000000000000000') {
    // Decrease sender's balance
    await prisma.tokenHolding.updateMany({
      where: {
        wallet: { address: from },
        token: { contractAddress: event.contractAddress },
      },
      data: {
        balance: { decrement: BigInt(value) },
      },
    });
  }
  
  if (to !== '0x0000000000000000000000000000000000000000') {
    // Increase receiver's balance
    await prisma.tokenHolding.upsert({
      where: {
        userId_tokenId: {
          userId: await getUserIdByWalletAddress(to),
          tokenId: await getTokenIdByContractAddress(event.contractAddress),
        },
      },
      update: {
        balance: { increment: BigInt(value) },
      },
      create: {
        userId: await getUserIdByWalletAddress(to),
        walletId: await getWalletIdByAddress(to),
        tokenId: await getTokenIdByContractAddress(event.contractAddress),
        balance: BigInt(value),
        averagePrice: 0,
        totalInvested: 0,
      },
    });
  }
}

async function handleTokenPurchase(event: any) {
  const { buyer, amount, price, totalValue } = event.data;
  
  // Create transaction record
  await prisma.transaction.create({
    data: {
      userId: await getUserIdByWalletAddress(buyer),
      walletId: await getWalletIdByAddress(buyer),
      tokenId: await getTokenIdByContractAddress(event.contractAddress),
      type: 'TOKEN_PURCHASE',
      amount: BigInt(amount),
      price: BigInt(price),
      totalValue: BigInt(totalValue),
      txHash: event.transactionHash,
      blockNumber: BigInt(event.blockNumber),
      status: 'CONFIRMED',
    });
}

async function handlePerkRedemption(event: any) {
  const { user, perkId } = event.data;
  
  // Create perk redemption record
  await prisma.perkRedemption.create({
    data: {
      userId: await getUserIdByWalletAddress(user),
      perkId: perkId,
      status: 'REDEEMED',
      redeemedAt: new Date(),
    });
}

async function handlePriceUpdate(event: any) {
  const { newPrice } = event.data;
  
  // Update token price
  await prisma.creatorToken.updateMany({
    where: { contractAddress: event.contractAddress },
    data: { currentPrice: BigInt(newPrice) },
  });
}

// ===== HELPER FUNCTIONS =====

async function getUserIdByWalletAddress(address: string): Promise<string> {
  const wallet = await prisma.wallet.findUnique({
    where: { address },
    select: { userId: true },
  });
  
  if (!wallet) {
    throw new Error(`Wallet not found for address: ${address}`);
  }
  
  return wallet.userId;
}

async function getWalletIdByAddress(address: string): Promise<string> {
  const wallet = await prisma.wallet.findUnique({
    where: { address },
    select: { id: true },
  });
  
  if (!wallet) {
    throw new Error(`Wallet not found for address: ${address}`);
  }
  
  return wallet.id;
}

async function getTokenIdByContractAddress(contractAddress: string): Promise<string> {
  const token = await prisma.creatorToken.findUnique({
    where: { contractAddress },
    select: { id: true },
  });
  
  if (!token) {
    throw new Error(`Token not found for contract: ${contractAddress}`);
  }
  
  return token.id;
}

// ===== GAS ABSTRACTION MIDDLEWARE =====

export async function handleGasPayment(transactionHash: string, gasUsed: bigint, gasPrice: bigint) {
  const gasCost = gasUsed * gasPrice;
  
  // Record gas payment
  await prisma.gasPayment.create({
    data: {
      transactionHash,
      amount: gasCost,
      paidBy: process.env.INORBYT_WALLET_ADDRESS!,
    },
  });
  
  // Update transaction with gas info
  await prisma.transaction.update({
    where: { txHash: transactionHash },
    data: {
      gasUsed,
      gasPrice,
    },
  });
}

// ===== AUDIT LOGGING =====

export async function logActivity(activity: {
  type: string;
  userId: string;
  metadata?: any;
}) {
  // This would integrate with your audit logging system
  console.log('Activity logged:', activity);
}

// ===== NOTIFICATION SYSTEM =====

export async function sendNotification(notification: {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  actionUrl?: string;
}) {
  await prisma.notification.create({
    data: {
      userId: notification.userId,
      type: notification.type as any,
      title: notification.title,
      message: notification.message,
      data: notification.data,
      actionUrl: notification.actionUrl,
    },
  });
  
  // Here you would also send real-time notifications via WebSocket
  // and push notifications via your notification service
}

// ===== STATS UPDATES =====

export async function updateTokenStats(tokenId: string) {
  const token = await prisma.creatorToken.findUnique({
    where: { id: tokenId },
    include: {
      holdings: true,
      transactions: true,
    },
  });
  
  if (!token) return;
  
  // Calculate stats
  const totalHolders = token.holdings.length;
  const totalVolume = token.transactions.reduce((sum, tx) => sum + tx.totalValue, BigInt(0));
  
  // Update token stats
  await prisma.creatorToken.update({
    where: { id: tokenId },
    data: {
      totalHolders,
      totalVolume,
      currentSupply: token.currentSupply,
    },
  });
}

// ===== DEFAULT PERKS CREATION =====

async function createDefaultPerks(creatorId: string, tokenId: string) {
  const defaultPerks = [
    {
      title: 'Exclusive Content',
      description: 'Access to exclusive content and updates',
      type: 'EXCLUSIVE_CONTENT',
      minTokensRequired: BigInt(100),
    },
    {
      title: 'Community Access',
      description: 'Join the creator\'s exclusive community',
      type: 'COMMUNITY_ACCESS',
      minTokensRequired: BigInt(500),
    },
    {
      title: 'Early Access',
      description: 'Get early access to new content and features',
      type: 'EARLY_ACCESS',
      minTokensRequired: BigInt(1000),
    },
  ];
  
  for (const perk of defaultPerks) {
    await prisma.perk.create({
      data: {
        creatorId,
        tokenId,
        ...perk,
      },
    });
  }
}
