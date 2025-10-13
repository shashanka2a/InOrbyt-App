import { NextRequest, NextResponse } from 'next/server';
import { syncBlockchainEvent, processBatchEvents } from '@/lib/prisma/blockchain-sync';
import { z } from 'zod';

// ===== BLOCKCHAIN EVENT API ROUTES =====

const blockchainEventSchema = z.object({
  eventType: z.string(),
  contractAddress: z.string(),
  blockNumber: z.number(),
  transactionHash: z.string(),
  logIndex: z.number(),
  data: z.any(),
});

const batchEventSchema = z.object({
  events: z.array(blockchainEventSchema),
});

// POST /api/blockchain/events - Process single blockchain event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = blockchainEventSchema.parse(body);

    await syncBlockchainEvent(validatedData);

    return NextResponse.json({ 
      message: 'Event processed successfully',
      eventType: validatedData.eventType,
      transactionHash: validatedData.transactionHash,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid event data', details: error.errors }, { status: 400 });
    }

    console.error('Error processing blockchain event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/blockchain/events/batch - Process multiple blockchain events
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = batchEventSchema.parse(body);

    const result = await processBatchEvents(validatedData.events);

    return NextResponse.json({
      message: 'Batch processing completed',
      successful: result.successful,
      failed: result.failed,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid batch data', details: error.errors }, { status: 400 });
    }

    console.error('Error processing batch events:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/blockchain/events - Get blockchain events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractAddress = searchParams.get('contractAddress');
    const eventType = searchParams.get('eventType');
    const processed = searchParams.get('processed');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let whereClause: any = {};

    if (contractAddress) {
      whereClause.contractAddress = contractAddress;
    }
    if (eventType) {
      whereClause.eventType = eventType;
    }
    if (processed !== null) {
      whereClause.processed = processed === 'true';
    }

    const { prisma } = await import('@/lib/prisma/client');
    
    const events = await prisma.blockchainEvent.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const totalCount = await prisma.blockchainEvent.count({
      where: whereClause,
    });

    return NextResponse.json({
      events,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
    });
  } catch (error) {
    console.error('Error fetching blockchain events:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
