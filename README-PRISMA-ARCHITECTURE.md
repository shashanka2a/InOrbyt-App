# InOrbyt Prisma Middleware Architecture

## 🏗️ Architecture Overview

This document outlines the comprehensive Prisma middleware architecture designed for the InOrbyt platform, integrating blockchain functionality with a robust database layer.

## 📊 Database Schema

### Core Models

#### **User Management**
- `User` - Core user profiles with creator/fan distinction
- `CreatorProfile` - Extended creator information and social links
- `Wallet` - Blockchain wallet connections (Privy, MetaMask, etc.)

#### **Token Economics**
- `CreatorToken` - ERC-20 tokens with fixed 1M supply
- `TokenHolding` - User token balances and investment tracking
- `Transaction` - All blockchain transactions with gas tracking

#### **Perks System**
- `Perk` - Creator-defined benefits for token holders
- `PerkRedemption` - User perk redemption tracking

#### **Blockchain Integration**
- `BlockchainEvent` - Real-time blockchain event processing
- `GasPayment` - InOrbyt gas payment tracking

## 🔄 Middleware Architecture

### **1. User Creation Middleware**
```typescript
// Automatically creates creator profile for creators
// Sends welcome notifications
// Initializes default settings
```

### **2. Token Creation Middleware**
```typescript
// Initializes token statistics
// Creates default perks based on preferences
// Logs token creation activity
// Prepares for blockchain deployment
```

### **3. Transaction Processing Middleware**
```typescript
// Processes blockchain transactions
// Updates token statistics in real-time
// Sends transaction notifications
// Tracks gas payments
```

### **4. Blockchain Event Middleware**
```typescript
// Handles real-time blockchain events
// Updates token holdings automatically
// Processes token transfers and purchases
// Manages perk redemptions
```

## 🚀 API Integration

### **User API** (`/api/users`)
- `GET` - Fetch user profiles with creator data
- `POST` - Create new users with validation
- `PUT` - Update user profiles
- `DELETE` - Account deletion

### **Token API** (`/api/tokens`)
- `GET` - Fetch tokens with statistics
- `POST` - Create new creator tokens
- `PUT` - Update token information
- `DELETE` - Remove tokens

### **Transaction API** (`/api/transactions`)
- `GET` - Fetch transaction history with pagination
- `POST` - Create transaction records
- `PUT` - Update transaction status

### **Blockchain API** (`/api/blockchain/events`)
- `POST` - Process single blockchain events
- `PUT` - Process batch blockchain events
- `GET` - Fetch blockchain event history

## 🔗 Blockchain Integration

### **Base Network Integration**
- **Mainnet**: Production deployment on Base
- **Sepolia**: Testing on Base Sepolia testnet
- **RPC**: Alchemy/Infura integration for reliable connections

### **Wallet Infrastructure**
- **Privy**: Email-based custodial wallets for non-crypto users
- **WalletConnect**: Self-custody wallet integration
- **Gas Abstraction**: Biconomy for seamless transactions

### **Smart Contract Integration**
- **ERC-20 Tokens**: OpenZeppelin standard implementation
- **Fixed Supply**: 1M tokens per creator (hidden in MVP)
- **Custodial Ownership**: InOrbyt manages contracts in MVP

## 📈 Real-time Data Synchronization

### **Blockchain Event Processing**
```typescript
// WebSocket connection to Base network
// Real-time event processing
// Automatic data synchronization
// Error recovery and retry logic
```

### **Token Statistics Updates**
```typescript
// Real-time holder count updates
// Volume and price tracking
// Floor price calculations
// Market cap computations
```

### **Transaction Processing**
```typescript
// Automatic transaction confirmation
// Gas payment tracking
// Balance updates
// Notification system
```

## 🛡️ Security & Validation

### **Input Validation**
- Zod schemas for all API endpoints
- Type-safe database operations
- Comprehensive error handling

### **Data Integrity**
- Foreign key constraints
- Unique constraints on critical fields
- Transaction rollback on errors

### **Audit Logging**
- All user actions logged
- Blockchain event tracking
- Gas payment auditing

## 🔧 Development Setup

### **1. Install Dependencies**
```bash
npm install @prisma/client prisma zod
npm install -D @types/node
```

### **2. Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Configure database URL
DATABASE_URL="postgresql://username:password@localhost:5432/inorbyt_db"

# Configure blockchain settings
BASE_RPC_URL="https://mainnet.base.org"
PRIVY_APP_ID="your_privy_app_id"
BICONOMY_API_KEY="your_biconomy_api_key"
```

### **3. Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database with sample data
npx prisma db seed
```

### **4. Start Blockchain Monitoring**
```typescript
import { startBlockchainMonitoring } from '@/lib/prisma/blockchain-sync';

// Start real-time blockchain event processing
startBlockchainMonitoring();
```

## 📊 Performance Optimizations

### **Database Indexing**
- Unique indexes on critical fields
- Composite indexes for complex queries
- Partial indexes for filtered data

### **Query Optimization**
- Eager loading for related data
- Pagination for large datasets
- Caching for frequently accessed data

### **Blockchain Efficiency**
- Batch event processing
- Error recovery mechanisms
- Rate limiting for API calls

## 🔮 Future Enhancements

### **Decentralization Path**
- DAO governance implementation
- Community-driven token economics
- Decentralized perk management

### **Advanced Features**
- Cross-chain token support
- Staking and yield farming
- Advanced analytics and insights
- Mobile app integration

### **Scalability Improvements**
- Database sharding
- Microservices architecture
- CDN integration for assets
- Advanced caching strategies

## 📚 Usage Examples

### **Creating a User**
```typescript
const user = await prisma.user.create({
  data: {
    email: 'creator@inorbyt.io',
    displayName: 'Alice Johnson',
    username: 'alice_creator',
    isCreator: true,
  },
});
```

### **Deploying a Token**
```typescript
const token = await prisma.creatorToken.create({
  data: {
    creatorId: creatorProfile.id,
    name: 'Alice Art Token',
    symbol: 'AAT',
    totalSupply: BigInt(1000000),
    startingPrice: BigInt('100000000000000000'), // 0.1 ETH
  },
});
```

### **Processing Blockchain Events**
```typescript
await syncBlockchainEvent({
  eventType: 'TokenTransfer',
  contractAddress: '0x...',
  blockNumber: 12345678,
  transactionHash: '0x...',
  logIndex: 0,
  data: { from: '0x...', to: '0x...', value: '100000000000000000000' },
});
```

## 🎯 Key Benefits

1. **Seamless UX**: No gas pop-ups, email-based onboarding
2. **Real-time Sync**: Automatic blockchain data synchronization
3. **Scalable Architecture**: Built for growth and expansion
4. **Developer Friendly**: Type-safe, well-documented APIs
5. **Blockchain Native**: Full Web3 integration with Web2 UX

This architecture provides a solid foundation for the InOrbyt platform, enabling creators to launch tokens and fans to engage seamlessly with blockchain technology.
