# InOrbyt Supabase Integration Guide

## 🚀 Quick Setup

### 1. **Database Setup**
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** to execute the schema

### 2. **Environment Variables**
Your `.env.local` file is already configured with:
```bash
DATABASE_URL="postgresql://postgres:7Xor3O1wvpdGxRVM@db.xnzofyxojqyjludpialf.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://xnzofyxojqyjludpialf.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. **Test Connection**
```bash
node scripts/test-supabase.js
```

## 📊 Database Schema

### **Core Tables Created:**
- ✅ `users` - User profiles and authentication
- ✅ `creator_profiles` - Extended creator information
- ✅ `wallets` - Blockchain wallet connections
- ✅ `creator_tokens` - ERC-20 token information
- ✅ `token_holdings` - User token balances
- ✅ `transactions` - All blockchain transactions
- ✅ `perks` - Creator-defined benefits
- ✅ `perk_redemptions` - User perk redemptions
- ✅ `notifications` - Real-time notifications
- ✅ `sessions` - User session management
- ✅ `blockchain_events` - Real-time blockchain sync
- ✅ `gas_payments` - Gas payment tracking

### **Features Included:**
- 🔐 **Row Level Security (RLS)** - Users can only access their own data
- 📈 **Comprehensive Indexing** - Optimized for performance
- 🔄 **Real-time Subscriptions** - Live data updates
- 🛡️ **Data Validation** - Type-safe operations
- 📊 **Sample Data** - Ready-to-test with sample users and tokens

## 🔧 Integration Features

### **1. Authentication**
```typescript
import { signUp, signIn, signOut, getCurrentUser } from '@/lib/supabase/auth';

// Create new user
const { data, error } = await signUp('user@example.com', 'password', {
  displayName: 'John Doe',
  username: 'johndoe',
  isCreator: true
});

// Sign in user
const { data, error } = await signIn('user@example.com', 'password');
```

### **2. Real-time Subscriptions**
```typescript
import { realtimeService } from '@/lib/supabase/realtime';

// Subscribe to user updates
const subscription = realtimeService.subscribeToUserProfile(userId, (payload) => {
  console.log('User updated:', payload);
});

// Subscribe to token updates
const tokenSubscription = realtimeService.subscribeToToken(tokenId, (payload) => {
  console.log('Token updated:', payload);
});
```

### **3. Database Operations**
```typescript
import { supabase } from '@/lib/supabase/client';

// Create token
const { data, error } = await supabase
  .from('creator_tokens')
  .insert({
    creator_id: creatorId,
    name: 'My Token',
    symbol: 'MTK',
    starting_price: '100000000000000000' // 0.1 ETH
  });

// Get user profile with relations
const { data, error } = await supabase
  .from('users')
  .select(`
    *,
    creator_profile:creator_profiles(*),
    wallets(*),
    token_holdings(*)
  `)
  .eq('id', userId)
  .single();
```

## 🎯 Key Benefits

### **1. Seamless Integration**
- **Prisma + Supabase** - Best of both worlds
- **Type Safety** - Full TypeScript support
- **Real-time** - Live data synchronization
- **Authentication** - Built-in user management

### **2. Blockchain Ready**
- **Wallet Integration** - Multiple wallet types supported
- **Transaction Tracking** - Complete transaction history
- **Gas Payment Tracking** - InOrbyt pays gas model
- **Event Processing** - Real-time blockchain sync

### **3. Scalable Architecture**
- **Row Level Security** - Data privacy by default
- **Optimized Queries** - Comprehensive indexing
- **Real-time Updates** - WebSocket subscriptions
- **Sample Data** - Ready for development

## 🚀 Next Steps

### **1. Run Database Setup**
1. Copy `supabase-schema.sql` content
2. Paste in Supabase SQL Editor
3. Execute to create all tables

### **2. Test Integration**
```bash
# Test connection
node scripts/test-supabase.js

# Start development server
npm run dev
```

### **3. Use in Your App**
```typescript
// In your components
import { supabase } from '@/lib/supabase/client';
import { realtimeService } from '@/lib/supabase/realtime';

// Real-time user dashboard
const subscription = realtimeService.subscribeToUserDashboard(userId, {
  onProfileUpdate: (payload) => {
    // Update UI with new profile data
  },
  onTransactionUpdate: (payload) => {
    // Update transaction list
  }
});
```

## 📱 UI Integration

### **Current PWA Flow + Supabase:**
1. **Welcome Screen** → Supabase user creation
2. **Profile Setup** → Real-time profile updates
3. **Wallet Setup** → Blockchain wallet connection
4. **Token Wizard** → Token creation with live updates
5. **Dashboard** → Real-time stats and notifications

### **Real-time Features:**
- 🔄 **Live Token Stats** - Price, holders, volume updates
- 📱 **Push Notifications** - Transaction confirmations
- 💬 **Chat Integration** - Community features
- 📊 **Analytics** - Real-time creator insights

## 🛡️ Security Features

### **Row Level Security Policies:**
- Users can only access their own data
- Creator profiles are public for viewing
- Tokens are public but only creators can modify
- Transactions are private to users
- Notifications are private to users

### **Authentication Flow:**
1. User signs up with email/password
2. Supabase creates auth user
3. Custom user profile created
4. Creator profile created if applicable
5. Real-time subscriptions activated

## 🎉 Ready to Go!

Your InOrbyt platform now has:
- ✅ **Complete Database Schema**
- ✅ **Real-time Subscriptions**
- ✅ **Authentication System**
- ✅ **Blockchain Integration**
- ✅ **Sample Data**
- ✅ **Type Safety**
- ✅ **Security Policies**

Just run the SQL schema in your Supabase dashboard and you're ready to build! 🚀
