import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { z } from 'zod';

// ===== TRANSACTION API ROUTES =====

const createTransactionSchema = z.object({
  userId: z.string(),
  walletId: z.string(),
  tokenId: z.string().optional(),
  type: z.enum(['TOKEN_PURCHASE', 'TOKEN_SALE', 'WITHDRAWAL', 'DEPOSIT', 'PERK_REDEMPTION', 'REWARD_CLAIM', 'GAS_PAYMENT']),
  amount: z.string().transform(val => BigInt(val)),
  price: z.string().transform(val => BigInt(val)).optional(),
  totalValue: z.string().transform(val => BigInt(val)),
  txHash: z.string().optional(),
  blockNumber: z.string().transform(val => BigInt(val)).optional(),
  gasUsed: z.string().transform(val => BigInt(val)).optional(),
  gasPrice: z.string().transform(val => BigInt(val)).optional(),
  description: z.string().optional(),
  metadata: z.any().optional(),
});

// GET /api/transactions - Get transactions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const tokenId = searchParams.get('tokenId');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let whereClause: any = {};

    if (userId) {
      whereClause.userId = userId;
    }
    if (tokenId) {
      whereClause.tokenId = tokenId;
    }
    if (type) {
      whereClause.type = type;
    }
    if (status) {
      whereClause.status = status;
    }

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            displayName: true,
            username: true,
            avatarUrl: true,
          },
        },
        wallet: {
          select: {
            address: true,
            walletType: true,
          },
        },
        token: {
          select: {
            name: true,
            symbol: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const totalCount = await prisma.transaction.count({
      where: whereClause,
    });

    return NextResponse.json({
      transactions,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/transactions - Create new transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createTransactionSchema.parse(body);

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify wallet exists
    const wallet = await prisma.wallet.findUnique({
      where: { id: validatedData.walletId },
    });

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    // Verify token exists if provided
    if (validatedData.tokenId) {
      const token = await prisma.creatorToken.findUnique({
        where: { id: validatedData.tokenId },
      });

      if (!token) {
        return NextResponse.json({ error: 'Token not found' }, { status: 404 });
      }
    }

    const transaction = await prisma.transaction.create({
      data: validatedData,
      include: {
        user: {
          select: {
            displayName: true,
            username: true,
            avatarUrl: true,
          },
        },
        wallet: {
          select: {
            address: true,
            walletType: true,
          },
        },
        token: {
          select: {
            name: true,
            symbol: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }

    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/transactions - Update transaction status
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json({ error: 'Transaction ID required' }, { status: 400 });
    }

    const body = await request.json();
    const { status, txHash, blockNumber, gasUsed, gasPrice } = body;

    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status,
        txHash,
        blockNumber: blockNumber ? BigInt(blockNumber) : undefined,
        gasUsed: gasUsed ? BigInt(gasUsed) : undefined,
        gasPrice: gasPrice ? BigInt(gasPrice) : undefined,
      },
      include: {
        user: {
          select: {
            displayName: true,
            username: true,
            avatarUrl: true,
          },
        },
        wallet: {
          select: {
            address: true,
            walletType: true,
          },
        },
        token: {
          select: {
            name: true,
            symbol: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
