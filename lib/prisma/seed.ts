import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const creator1 = await prisma.user.create({
    data: {
      email: 'creator1@inorbyt.io',
      displayName: 'Alice Johnson',
      username: 'alice_creator',
      bio: 'Digital artist and NFT creator',
      avatarUrl: 'https://example.com/avatar1.jpg',
      isCreator: true,
      isVerified: true,
    },
  });

  const creator2 = await prisma.user.create({
    data: {
      email: 'creator2@inorbyt.io',
      displayName: 'Bob Smith',
      username: 'bob_artist',
      bio: 'Music producer and content creator',
      avatarUrl: 'https://example.com/avatar2.jpg',
      isCreator: true,
      isVerified: false,
    },
  });

  const fan1 = await prisma.user.create({
    data: {
      email: 'fan1@inorbyt.io',
      displayName: 'Charlie Brown',
      username: 'charlie_fan',
      bio: 'Crypto enthusiast and collector',
      avatarUrl: 'https://example.com/avatar3.jpg',
      isCreator: false,
    },
  });

  // Create creator profiles
  const creatorProfile1 = await prisma.creatorProfile.create({
    data: {
      userId: creator1.id,
      twitterHandle: 'alice_creator',
      instagramHandle: 'alice_art',
      website: 'https://alice-art.com',
      totalFollowers: 15000,
      totalRevenue: 25000.50,
      isPublic: true,
    },
  });

  const creatorProfile2 = await prisma.creatorProfile.create({
    data: {
      userId: creator2.id,
      twitterHandle: 'bob_music',
      youtubeChannel: 'BobMusicChannel',
      totalFollowers: 8500,
      totalRevenue: 12000.25,
      isPublic: true,
    },
  });

  // Create wallets
  const wallet1 = await prisma.wallet.create({
    data: {
      userId: creator1.id,
      address: '0x1234567890123456789012345678901234567890',
      walletType: 'PRIVY_EMAIL',
      isActive: true,
      isCustodial: true,
      chainId: 8453,
      networkName: 'base',
    },
  });

  const wallet2 = await prisma.wallet.create({
    data: {
      userId: creator2.id,
      address: '0x2345678901234567890123456789012345678901',
      walletType: 'METAMASK',
      isActive: true,
      isCustodial: false,
      chainId: 8453,
      networkName: 'base',
    },
  });

  const fanWallet = await prisma.wallet.create({
    data: {
      userId: fan1.id,
      address: '0x3456789012345678901234567890123456789012',
      walletType: 'COINBASE_WALLET',
      isActive: true,
      isCustodial: false,
      chainId: 8453,
      networkName: 'base',
    },
  });

  // Create creator tokens
  const token1 = await prisma.creatorToken.create({
    data: {
      creatorId: creatorProfile1.id,
      name: 'Alice Art Token',
      symbol: 'AAT',
      description: 'Exclusive access to Alice\'s digital art and behind-the-scenes content',
      imageUrl: 'https://example.com/token1.jpg',
      totalSupply: BigInt(1000000),
      currentSupply: BigInt(150000),
      startingPrice: BigInt('100000000000000000'), // 0.1 ETH
      currentPrice: BigInt('120000000000000000'), // 0.12 ETH
      maxTokensPerFan: BigInt(1000),
      allowFutureMinting: false,
      contractAddress: '0x1111111111111111111111111111111111111111',
      isDeployed: true,
      totalHolders: 45,
      totalVolume: BigInt('5000000000000000000'), // 5 ETH
      floorPrice: BigInt('115000000000000000'), // 0.115 ETH
    },
  });

  const token2 = await prisma.creatorToken.create({
    data: {
      creatorId: creatorProfile2.id,
      name: 'Bob Music Token',
      symbol: 'BMT',
      description: 'Access to exclusive music tracks and studio sessions',
      imageUrl: 'https://example.com/token2.jpg',
      totalSupply: BigInt(1000000),
      currentSupply: BigInt(75000),
      startingPrice: BigInt('50000000000000000'), // 0.05 ETH
      currentPrice: BigInt('60000000000000000'), // 0.06 ETH
      maxTokensPerFan: BigInt(2000),
      allowFutureMinting: true,
      contractAddress: '0x2222222222222222222222222222222222222222',
      isDeployed: true,
      totalHolders: 28,
      totalVolume: BigInt('3000000000000000000'), // 3 ETH
      floorPrice: BigInt('58000000000000000'), // 0.058 ETH
    },
  });

  // Create perks
  const perk1 = await prisma.perk.create({
    data: {
      creatorId: creatorProfile1.id,
      tokenId: token1.id,
      title: 'Exclusive Art Drops',
      description: 'Get early access to new digital art pieces',
      type: 'EXCLUSIVE_CONTENT',
      isActive: true,
      minTokensRequired: BigInt(100),
      maxRedemptions: 1000,
      currentRedemptions: 15,
    },
  });

  const perk2 = await prisma.perk.create({
    data: {
      creatorId: creatorProfile1.id,
      tokenId: token1.id,
      title: 'Art Community Access',
      description: 'Join the exclusive Discord community',
      type: 'COMMUNITY_ACCESS',
      isActive: true,
      minTokensRequired: BigInt(500),
      maxRedemptions: 500,
      currentRedemptions: 8,
    },
  });

  const perk3 = await prisma.perk.create({
    data: {
      creatorId: creatorProfile2.id,
      tokenId: token2.id,
      title: 'Studio Session Access',
      description: 'Watch live studio recording sessions',
      type: 'VIRTUAL_MEETING',
      isActive: true,
      minTokensRequired: BigInt(1000),
      maxRedemptions: 50,
      currentRedemptions: 3,
    },
  });

  // Create token holdings
  await prisma.tokenHolding.create({
    data: {
      userId: fan1.id,
      walletId: fanWallet.id,
      tokenId: token1.id,
      balance: BigInt(250),
      averagePrice: BigInt('110000000000000000'),
      totalInvested: BigInt('27500000000000000000'),
      lastSyncedAt: new Date(),
    },
  });

  await prisma.tokenHolding.create({
    data: {
      userId: fan1.id,
      walletId: fanWallet.id,
      tokenId: token2.id,
      balance: BigInt(500),
      averagePrice: BigInt('55000000000000000'),
      totalInvested: BigInt('27500000000000000000'),
      lastSyncedAt: new Date(),
    },
  });

  // Create transactions
  await prisma.transaction.create({
    data: {
      userId: fan1.id,
      walletId: fanWallet.id,
      tokenId: token1.id,
      type: 'TOKEN_PURCHASE',
      amount: BigInt(100),
      price: BigInt('100000000000000000'),
      totalValue: BigInt('10000000000000000000'),
      txHash: '0xabc123def456789012345678901234567890123456789012345678901234567890',
      blockNumber: BigInt(12345678),
      gasUsed: BigInt(21000),
      gasPrice: BigInt('20000000000'),
      status: 'CONFIRMED',
      description: 'Initial token purchase',
    },
  });

  await prisma.transaction.create({
    data: {
      userId: fan1.id,
      walletId: fanWallet.id,
      tokenId: token1.id,
      type: 'TOKEN_PURCHASE',
      amount: BigInt(150),
      price: BigInt('120000000000000000'),
      totalValue: BigInt('18000000000000000000'),
      txHash: '0xdef456abc789012345678901234567890123456789012345678901234567890123',
      blockNumber: BigInt(12345679),
      gasUsed: BigInt(25000),
      gasPrice: BigInt('22000000000'),
      status: 'CONFIRMED',
      description: 'Additional token purchase',
    },
  });

  // Create perk redemptions
  await prisma.perkRedemption.create({
    data: {
      userId: fan1.id,
      perkId: perk1.id,
      status: 'REDEEMED',
      redeemedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: creator1.id,
      type: 'TOKEN_PURCHASE',
      title: 'New Token Purchase',
      message: 'Someone purchased 100 AAT tokens!',
      isRead: false,
      data: { tokenId: token1.id, amount: 100 },
    },
  });

  await prisma.notification.create({
    data: {
      userId: fan1.id,
      type: 'PERK_REDEMPTION',
      title: 'Perk Redeemed',
      message: 'You successfully redeemed "Exclusive Art Drops" perk!',
      isRead: true,
      data: { perkId: perk1.id },
    },
  });

  // Create blockchain events
  await prisma.blockchainEvent.create({
    data: {
      eventType: 'TokenTransfer',
      contractAddress: token1.contractAddress!,
      blockNumber: BigInt(12345678),
      transactionHash: '0xabc123def456789012345678901234567890123456789012345678901234567890',
      logIndex: 0,
      data: {
        from: '0x0000000000000000000000000000000000000000',
        to: fanWallet.address,
        value: '100000000000000000000',
      },
      processed: true,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created ${await prisma.user.count()} users`);
  console.log(`Created ${await prisma.creatorToken.count()} tokens`);
  console.log(`Created ${await prisma.perk.count()} perks`);
  console.log(`Created ${await prisma.transaction.count()} transactions`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
