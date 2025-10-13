import { prisma } from './client';
import { handleBlockchainEvent } from './middleware';

/**
 * Blockchain Synchronization Service
 * Handles real-time blockchain event processing and data synchronization
 */

// ===== BLOCKCHAIN EVENT PROCESSING =====

export async function syncBlockchainEvent(event: {
  eventType: string;
  contractAddress: string;
  blockNumber: number;
  transactionHash: string;
  logIndex: number;
  data: any;
}) {
  try {
    // Check if event already processed
    const existingEvent = await prisma.blockchainEvent.findUnique({
      where: {
        transactionHash_logIndex: {
          transactionHash: event.transactionHash,
          logIndex: event.logIndex,
        },
      },
    });

    if (existingEvent) {
      console.log('Event already processed:', event.transactionHash);
      return;
    }

    // Process the event
    await handleBlockchainEvent(event);

    console.log('Blockchain event processed:', event.eventType);
  } catch (error) {
    console.error('Error syncing blockchain event:', error);
    throw error;
  }
}

// ===== TOKEN TRANSACTION PROCESSING =====

export async function processTokenTransaction(transaction: {
  id: string;
  userId: string;
  tokenId: string;
  type: string;
  amount: bigint;
  price?: bigint;
  totalValue: bigint;
  txHash: string;
  blockNumber: bigint;
}) {
  try {
    // Update token holdings
    await updateTokenHoldings(transaction);
    
    // Update token statistics
    await updateTokenStatistics(transaction.tokenId);
    
    // Process gas payment if applicable
    if (transaction.txHash) {
      await processGasPayment(transaction.txHash);
    }
    
    console.log('Token transaction processed:', transaction.id);
  } catch (error) {
    console.error('Error processing token transaction:', error);
    throw error;
  }
}

// ===== TOKEN STATISTICS UPDATES =====

export async function updateTokenStats(tokenId: string) {
  try {
    const token = await prisma.creatorToken.findUnique({
      where: { id: tokenId },
      include: {
        holdings: {
          where: { isActive: true },
        },
        transactions: {
          where: { status: 'CONFIRMED' },
        },
      },
    });

    if (!token) {
      throw new Error(`Token not found: ${tokenId}`);
    }

    // Calculate updated statistics
    const totalHolders = token.holdings.length;
    const totalVolume = token.transactions.reduce(
      (sum, tx) => sum + tx.totalValue,
      BigInt(0)
    );
    
    // Calculate floor price from recent transactions
    const recentTransactions = token.transactions
      .filter(tx => tx.price && tx.price > 0)
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .slice(0, 10);
    
    const floorPrice = recentTransactions.length > 0
      ? recentTransactions.reduce((sum, tx) => sum + (tx.price || BigInt(0)), BigInt(0)) / BigInt(recentTransactions.length)
      : token.startingPrice;

    // Update token with new statistics
    await prisma.creatorToken.update({
      where: { id: tokenId },
      data: {
        totalHolders,
        totalVolume,
        floorPrice,
        updatedAt: new Date(),
      },
    });

    console.log(`Token stats updated for ${tokenId}:`, {
      totalHolders,
      totalVolume: totalVolume.toString(),
      floorPrice: floorPrice.toString(),
    });
  } catch (error) {
    console.error('Error updating token stats:', error);
    throw error;
  }
}

// ===== HELPER FUNCTIONS =====

async function updateTokenHoldings(transaction: any) {
  const { userId, tokenId, type, amount, price, totalValue } = transaction;
  
  // Get user's wallet
  const wallet = await prisma.wallet.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!wallet) {
    throw new Error(`Wallet not found for user: ${userId}`);
  }

  // Get or create token holding
  const existingHolding = await prisma.tokenHolding.findUnique({
    where: {
      userId_tokenId: {
        userId,
        tokenId,
      },
    },
  });

  if (type === 'TOKEN_PURCHASE') {
    if (existingHolding) {
      // Update existing holding
      const newBalance = existingHolding.balance + amount;
      const newTotalInvested = existingHolding.totalInvested + totalValue;
      const newAveragePrice = newTotalInvested / newBalance;

      await prisma.tokenHolding.update({
        where: { id: existingHolding.id },
        data: {
          balance: newBalance,
          totalInvested: newTotalInvested,
          averagePrice: newAveragePrice,
          lastSyncedAt: new Date(),
        },
      });
    } else {
      // Create new holding
      await prisma.tokenHolding.create({
        data: {
          userId,
          walletId: wallet.id,
          tokenId,
          balance: amount,
          averagePrice: price || BigInt(0),
          totalInvested: totalValue,
          lastSyncedAt: new Date(),
        },
      });
    }
  } else if (type === 'TOKEN_SALE') {
    if (existingHolding) {
      const newBalance = existingHolding.balance - amount;
      
      if (newBalance <= 0) {
        // Remove holding if balance is zero or negative
        await prisma.tokenHolding.delete({
          where: { id: existingHolding.id },
        });
      } else {
        // Update holding
        await prisma.tokenHolding.update({
          where: { id: existingHolding.id },
          data: {
            balance: newBalance,
            lastSyncedAt: new Date(),
          },
        });
      }
    }
  }
}

async function updateTokenStatistics(tokenId: string) {
  // This is handled by the main updateTokenStats function
  await updateTokenStats(tokenId);
}

async function processGasPayment(txHash: string) {
  // This would integrate with your gas payment tracking
  // For now, we'll just log it
  console.log('Gas payment processed for transaction:', txHash);
}

// ===== BLOCKCHAIN MONITORING =====

export async function startBlockchainMonitoring() {
  // This would start a background process to monitor blockchain events
  // Integration with WebSocket providers like Alchemy, Infura, or Moralis
  
  console.log('Blockchain monitoring started');
  
  // Example WebSocket connection setup
  // const ws = new WebSocket('wss://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY');
  // 
  // ws.on('message', async (data) => {
  //   const event = JSON.parse(data);
  //   await syncBlockchainEvent(event);
  // });
}

// ===== BATCH PROCESSING =====

export async function processBatchEvents(events: any[]) {
  try {
    const results = await Promise.allSettled(
      events.map(event => syncBlockchainEvent(event))
    );
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    console.log(`Batch processing complete: ${successful} successful, ${failed} failed`);
    
    return { successful, failed };
  } catch (error) {
    console.error('Error in batch processing:', error);
    throw error;
  }
}

// ===== ERROR RECOVERY =====

export async function recoverFailedEvents() {
  try {
    const failedEvents = await prisma.blockchainEvent.findMany({
      where: { processed: false },
      orderBy: { createdAt: 'asc' },
      take: 100, // Process in batches
    });

    console.log(`Recovering ${failedEvents.length} failed events`);

    for (const event of failedEvents) {
      try {
        await handleBlockchainEvent({
          eventType: event.eventType,
          contractAddress: event.contractAddress,
          blockNumber: Number(event.blockNumber),
          transactionHash: event.transactionHash,
          logIndex: event.logIndex,
          data: event.data,
        });
      } catch (error) {
        console.error(`Failed to recover event ${event.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error in event recovery:', error);
    throw error;
  }
}
