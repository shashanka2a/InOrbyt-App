import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { z } from 'zod';

// ===== USER API ROUTES =====

const createUserSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(1),
  username: z.string().min(3).max(20),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  isCreator: z.boolean().default(false),
});

const updateUserSchema = z.object({
  displayName: z.string().min(1).optional(),
  username: z.string().min(3).max(20).optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

// GET /api/users - Get user profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const username = searchParams.get('username');

    if (!userId && !username) {
      return NextResponse.json({ error: 'User ID or username required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: userId ? { id: userId } : { username },
      include: {
        creatorProfile: {
          include: {
            tokens: {
              include: {
                _count: {
                  select: {
                    holdings: true,
                    transactions: true,
                  },
                },
              },
            },
            perks: true,
          },
        },
        wallets: true,
        _count: {
          select: {
            tokenHoldings: true,
            transactions: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username: validatedData.username },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
    }

    // Check if email is already taken
    const existingEmail = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingEmail) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: validatedData,
      include: {
        creatorProfile: true,
        wallets: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }

    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/users - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = updateUserSchema.parse(body);

    // Check if username is already taken by another user
    if (validatedData.username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: validatedData.username,
          id: { not: userId },
        },
      });

      if (existingUser) {
        return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: validatedData,
      include: {
        creatorProfile: true,
        wallets: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }

    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/users - Delete user account
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
