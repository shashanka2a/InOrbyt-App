import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { z } from 'zod';

// ===== TOKEN API ROUTES =====

const createTokenSchema = z.object({
  creatorId: z.string(),
  name: z.string().min(1),
  symbol: z.string().min(1).max(10),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  totalSupply: z.bigint().default(BigInt(1000000)),
  startingPrice: z.string().transform(val => BigInt(val)),
  maxTokensPerFan: z.bigint().default(BigInt(1000)),
  allowFutureMinting: z.boolean().default(false),
});

const updateTokenSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  currentPrice: z.string().transform(val => BigInt(val)).optional(),
  allowFutureMinting: z.boolean().optional(),
});

// GET /api/tokens - Get tokens
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId');
    const symbol = searchParams.get('symbol');
    const contractAddress = searchParams.get('contractAddress');

    let whereClause: any = {};

    if (creatorId) {
      whereClause.creatorId = creatorId;
    }
    if (symbol) {
      whereClause.symbol = symbol;
    }
    if (contractAddress) {
      whereClause.contractAddress = contractAddress;
    }

    const tokens = await prisma.creatorToken.findMany({
      where: whereClause,
      include: {
        creator: {
          include: {
            user: {
              select: {
                displayName: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            holdings: true,
            transactions: true,
            perks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/tokens - Create new token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createTokenSchema.parse(body);

    // Check if symbol is already taken
    const existingToken = await prisma.creatorToken.findUnique({
      where: { symbol: validatedData.symbol },
    });

    if (existingToken) {
      return NextResponse.json({ error: 'Token symbol already exists' }, { status: 409 });
    }

    // Verify creator exists
    const creator = await prisma.creatorProfile.findUnique({
      where: { id: validatedData.creatorId },
    });

    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 });
    }

    const token = await prisma.creatorToken.create({
      data: {
        ...validatedData,
        currentPrice: validatedData.startingPrice,
        floorPrice: validatedData.startingPrice,
      },
      include: {
        creator: {
          include: {
            user: {
              select: {
                displayName: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            holdings: true,
            transactions: true,
            perks: true,
          },
        },
      },
    });

    return NextResponse.json(token, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }

    console.error('Error creating token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/tokens - Update token
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get('tokenId');

    if (!tokenId) {
      return NextResponse.json({ error: 'Token ID required' }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = updateTokenSchema.parse(body);

    const token = await prisma.creatorToken.update({
      where: { id: tokenId },
      data: validatedData,
      include: {
        creator: {
          include: {
            user: {
              select: {
                displayName: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            holdings: true,
            transactions: true,
            perks: true,
          },
        },
      },
    });

    return NextResponse.json(token);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }

    console.error('Error updating token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/tokens - Delete token
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get('tokenId');

    if (!tokenId) {
      return NextResponse.json({ error: 'Token ID required' }, { status: 400 });
    }

    await prisma.creatorToken.delete({
      where: { id: tokenId },
    });

    return NextResponse.json({ message: 'Token deleted successfully' });
  } catch (error) {
    console.error('Error deleting token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
