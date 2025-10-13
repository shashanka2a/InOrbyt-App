-- InOrbyt Database Schema for Supabase
-- This script creates all the necessary tables for the InOrbyt platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== CORE USER & PROFILE MODELS =====

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    is_creator BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creator profiles table
CREATE TABLE IF NOT EXISTS creator_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    twitter_handle VARCHAR(255),
    instagram_handle VARCHAR(255),
    youtube_channel VARCHAR(255),
    website TEXT,
    total_followers INTEGER DEFAULT 0,
    total_revenue DECIMAL(18, 8) DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== WALLET & BLOCKCHAIN MODELS =====

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(42) UNIQUE NOT NULL,
    wallet_type VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_custodial BOOLEAN DEFAULT FALSE,
    chain_id INTEGER DEFAULT 8453,
    network_name VARCHAR(50) DEFAULT 'base',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== TOKEN MODELS =====

-- Creator tokens table
CREATE TABLE IF NOT EXISTS creator_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    total_supply NUMERIC(78, 0) DEFAULT 1000000,
    current_supply NUMERIC(78, 0) DEFAULT 0,
    starting_price NUMERIC(78, 0) NOT NULL,
    current_price NUMERIC(78, 0),
    max_tokens_per_fan NUMERIC(78, 0) DEFAULT 1000,
    allow_future_minting BOOLEAN DEFAULT FALSE,
    contract_address VARCHAR(42) UNIQUE,
    token_id VARCHAR(255),
    deployment_tx_hash VARCHAR(66),
    is_deployed BOOLEAN DEFAULT FALSE,
    total_holders INTEGER DEFAULT 0,
    total_volume NUMERIC(78, 0) DEFAULT 0,
    floor_price NUMERIC(78, 0) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token holdings table
CREATE TABLE IF NOT EXISTS token_holdings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    token_id UUID NOT NULL REFERENCES creator_tokens(id) ON DELETE CASCADE,
    balance NUMERIC(78, 0) NOT NULL,
    average_price NUMERIC(78, 0) NOT NULL,
    total_invested NUMERIC(78, 0) NOT NULL,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, token_id)
);

-- ===== TRANSACTION MODELS =====

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    token_id UUID REFERENCES creator_tokens(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL,
    amount NUMERIC(78, 0) NOT NULL,
    price NUMERIC(78, 0),
    total_value NUMERIC(78, 0) NOT NULL,
    tx_hash VARCHAR(66) UNIQUE,
    block_number NUMERIC(78, 0),
    gas_used NUMERIC(78, 0),
    gas_price NUMERIC(78, 0),
    status VARCHAR(20) DEFAULT 'PENDING',
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== PERKS MODELS =====

-- Perks table
CREATE TABLE IF NOT EXISTS perks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
    token_id UUID REFERENCES creator_tokens(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    min_tokens_required NUMERIC(78, 0),
    max_redemptions INTEGER,
    current_redemptions INTEGER DEFAULT 0,
    image_url TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Perk redemptions table
CREATE TABLE IF NOT EXISTS perk_redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    perk_id UUID NOT NULL REFERENCES perks(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'PENDING',
    redeemed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== NOTIFICATION MODELS =====

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    data JSONB,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== SESSION MODELS =====

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== BLOCKCHAIN SYNC MODELS =====

-- Blockchain events table
CREATE TABLE IF NOT EXISTS blockchain_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    block_number NUMERIC(78, 0) NOT NULL,
    transaction_hash VARCHAR(66) NOT NULL,
    log_index INTEGER NOT NULL,
    data JSONB NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(transaction_hash, log_index)
);

-- Gas payments table
CREATE TABLE IF NOT EXISTS gas_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_hash VARCHAR(66) UNIQUE NOT NULL,
    amount NUMERIC(78, 0) NOT NULL,
    token_address VARCHAR(42),
    paid_by VARCHAR(42) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== INDEXES =====

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_is_creator ON users(is_creator);

-- Creator profiles indexes
CREATE INDEX IF NOT EXISTS idx_creator_profiles_user_id ON creator_profiles(user_id);

-- Wallets indexes
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_wallets_address ON wallets(address);
CREATE INDEX IF NOT EXISTS idx_wallets_is_active ON wallets(is_active);

-- Creator tokens indexes
CREATE INDEX IF NOT EXISTS idx_creator_tokens_creator_id ON creator_tokens(creator_id);
CREATE INDEX IF NOT EXISTS idx_creator_tokens_symbol ON creator_tokens(symbol);
CREATE INDEX IF NOT EXISTS idx_creator_tokens_contract_address ON creator_tokens(contract_address);
CREATE INDEX IF NOT EXISTS idx_creator_tokens_is_deployed ON creator_tokens(is_deployed);

-- Token holdings indexes
CREATE INDEX IF NOT EXISTS idx_token_holdings_user_id ON token_holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_token_holdings_token_id ON token_holdings(token_id);
CREATE INDEX IF NOT EXISTS idx_token_holdings_wallet_id ON token_holdings(wallet_id);
CREATE INDEX IF NOT EXISTS idx_token_holdings_is_active ON token_holdings(is_active);

-- Transactions indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_token_id ON transactions(token_id);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_transactions_tx_hash ON transactions(tx_hash);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

-- Perks indexes
CREATE INDEX IF NOT EXISTS idx_perks_creator_id ON perks(creator_id);
CREATE INDEX IF NOT EXISTS idx_perks_token_id ON perks(token_id);
CREATE INDEX IF NOT EXISTS idx_perks_is_active ON perks(is_active);

-- Perk redemptions indexes
CREATE INDEX IF NOT EXISTS idx_perk_redemptions_user_id ON perk_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_perk_redemptions_perk_id ON perk_redemptions(perk_id);
CREATE INDEX IF NOT EXISTS idx_perk_redemptions_status ON perk_redemptions(status);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Sessions indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_is_active ON sessions(is_active);

-- Blockchain events indexes
CREATE INDEX IF NOT EXISTS idx_blockchain_events_contract_address ON blockchain_events(contract_address);
CREATE INDEX IF NOT EXISTS idx_blockchain_events_event_type ON blockchain_events(event_type);
CREATE INDEX IF NOT EXISTS idx_blockchain_events_processed ON blockchain_events(processed);
CREATE INDEX IF NOT EXISTS idx_blockchain_events_created_at ON blockchain_events(created_at);

-- Gas payments indexes
CREATE INDEX IF NOT EXISTS idx_gas_payments_transaction_hash ON gas_payments(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_gas_payments_paid_by ON gas_payments(paid_by);

-- ===== ROW LEVEL SECURITY (RLS) =====

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE perks ENABLE ROW LEVEL SECURITY;
ALTER TABLE perk_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gas_payments ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Creator profiles are public for viewing
CREATE POLICY "Creator profiles are viewable by everyone" ON creator_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own creator profile" ON creator_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Wallets are private to users
CREATE POLICY "Users can view own wallets" ON wallets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wallets" ON wallets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Creator tokens are public for viewing
CREATE POLICY "Creator tokens are viewable by everyone" ON creator_tokens
    FOR SELECT USING (true);

CREATE POLICY "Creators can manage own tokens" ON creator_tokens
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM creator_profiles 
            WHERE creator_profiles.id = creator_tokens.creator_id 
            AND creator_profiles.user_id = auth.uid()
        )
    );

-- Token holdings are private to users
CREATE POLICY "Users can view own token holdings" ON token_holdings
    FOR SELECT USING (auth.uid() = user_id);

-- Transactions are private to users
CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Perks are public for viewing
CREATE POLICY "Perks are viewable by everyone" ON perks
    FOR SELECT USING (true);

CREATE POLICY "Creators can manage own perks" ON perks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM creator_profiles 
            WHERE creator_profiles.id = perks.creator_id 
            AND creator_profiles.user_id = auth.uid()
        )
    );

-- Perk redemptions are private to users
CREATE POLICY "Users can view own perk redemptions" ON perk_redemptions
    FOR SELECT USING (auth.uid() = user_id);

-- Notifications are private to users
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Sessions are private to users
CREATE POLICY "Users can view own sessions" ON sessions
    FOR SELECT USING (auth.uid() = user_id);

-- Blockchain events are public (for monitoring)
CREATE POLICY "Blockchain events are viewable by everyone" ON blockchain_events
    FOR SELECT USING (true);

-- Gas payments are public (for transparency)
CREATE POLICY "Gas payments are viewable by everyone" ON gas_payments
    FOR SELECT USING (true);

-- ===== FUNCTIONS =====

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_creator_profiles_updated_at BEFORE UPDATE ON creator_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_creator_tokens_updated_at BEFORE UPDATE ON creator_tokens FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_token_holdings_updated_at BEFORE UPDATE ON token_holdings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_perks_updated_at BEFORE UPDATE ON perks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_perk_redemptions_updated_at BEFORE UPDATE ON perk_redemptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blockchain_events_updated_at BEFORE UPDATE ON blockchain_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===== SAMPLE DATA =====

-- Insert sample users
INSERT INTO users (id, email, display_name, username, bio, is_creator, is_verified) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'alice@inorbyt.io', 'Alice Johnson', 'alice_creator', 'Digital artist and NFT creator', true, true),
    ('550e8400-e29b-41d4-a716-446655440002', 'bob@inorbyt.io', 'Bob Smith', 'bob_artist', 'Music producer and content creator', true, false),
    ('550e8400-e29b-41d4-a716-446655440003', 'charlie@inorbyt.io', 'Charlie Brown', 'charlie_fan', 'Crypto enthusiast and collector', false, false)
ON CONFLICT (id) DO NOTHING;

-- Insert creator profiles
INSERT INTO creator_profiles (id, user_id, twitter_handle, instagram_handle, website, total_followers, total_revenue, is_public) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'alice_creator', 'alice_art', 'https://alice-art.com', 15000, 25000.50, true),
    ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'bob_music', null, null, 8500, 12000.25, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample wallets
INSERT INTO wallets (id, user_id, address, wallet_type, is_active, is_custodial, chain_id, network_name) VALUES
    ('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '0x1234567890123456789012345678901234567890', 'PRIVY_EMAIL', true, true, 8453, 'base'),
    ('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '0x2345678901234567890123456789012345678901', 'METAMASK', true, false, 8453, 'base'),
    ('750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '0x3456789012345678901234567890123456789012', 'COINBASE_WALLET', true, false, 8453, 'base')
ON CONFLICT (id) DO NOTHING;

-- Insert sample creator tokens
INSERT INTO creator_tokens (id, creator_id, name, symbol, description, total_supply, current_supply, starting_price, current_price, max_tokens_per_fan, allow_future_minting, contract_address, is_deployed, total_holders, total_volume, floor_price) VALUES
    ('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'Alice Art Token', 'AAT', 'Exclusive access to Alice''s digital art and behind-the-scenes content', 1000000, 150000, 100000000000000000, 120000000000000000, 1000, false, '0x1111111111111111111111111111111111111111', true, 45, 5000000000000000000, 115000000000000000),
    ('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', 'Bob Music Token', 'BMT', 'Access to exclusive music tracks and studio sessions', 1000000, 75000, 50000000000000000, 60000000000000000, 2000, true, '0x2222222222222222222222222222222222222222', true, 28, 3000000000000000000, 58000000000000000)
ON CONFLICT (id) DO NOTHING;

-- Insert sample token holdings
INSERT INTO token_holdings (id, user_id, wallet_id, token_id, balance, average_price, total_invested, last_synced_at, is_active) VALUES
    ('950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 250, 110000000000000000, 27500000000000000000, NOW(), true),
    ('950e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440002', 500, 55000000000000000, 27500000000000000000, NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample transactions
INSERT INTO transactions (id, user_id, wallet_id, token_id, type, amount, price, total_value, tx_hash, block_number, gas_used, gas_price, status, description) VALUES
    ('a50e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 'TOKEN_PURCHASE', 100, 100000000000000000, 10000000000000000000, '0xabc123def456789012345678901234567890123456789012345678901234567890', 12345678, 21000, 20000000000, 'CONFIRMED', 'Initial token purchase'),
    ('a50e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 'TOKEN_PURCHASE', 150, 120000000000000000, 18000000000000000000, '0xdef456abc789012345678901234567890123456789012345678901234567890123', 12345679, 25000, 22000000000, 'CONFIRMED', 'Additional token purchase')
ON CONFLICT (id) DO NOTHING;

-- Insert sample perks
INSERT INTO perks (id, creator_id, token_id, title, description, type, is_active, min_tokens_required, max_redemptions, current_redemptions) VALUES
    ('b50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 'Exclusive Art Drops', 'Get early access to new digital art pieces', 'EXCLUSIVE_CONTENT', true, 100, 1000, 15),
    ('b50e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 'Art Community Access', 'Join the exclusive Discord community', 'COMMUNITY_ACCESS', true, 500, 500, 8),
    ('b50e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440002', 'Studio Session Access', 'Watch live studio recording sessions', 'VIRTUAL_MEETING', true, 1000, 50, 3)
ON CONFLICT (id) DO NOTHING;

-- Insert sample perk redemptions
INSERT INTO perk_redemptions (id, user_id, perk_id, status, redeemed_at, expires_at) VALUES
    ('c50e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'b50e8400-e29b-41d4-a716-446655440001', 'REDEEMED', NOW(), NOW() + INTERVAL '30 days')
ON CONFLICT (id) DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (id, user_id, type, title, message, is_read, data) VALUES
    ('d50e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'TOKEN_PURCHASE', 'New Token Purchase', 'Someone purchased 100 AAT tokens!', false, '{"tokenId": "850e8400-e29b-41d4-a716-446655440001", "amount": 100}'),
    ('d50e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'PERK_REDEMPTION', 'Perk Redeemed', 'You successfully redeemed "Exclusive Art Drops" perk!', true, '{"perkId": "b50e8400-e29b-41d4-a716-446655440001"}')
ON CONFLICT (id) DO NOTHING;

-- Insert sample blockchain events
INSERT INTO blockchain_events (id, event_type, contract_address, block_number, transaction_hash, log_index, data, processed) VALUES
    ('e50e8400-e29b-41d4-a716-446655440001', 'TokenTransfer', '0x1111111111111111111111111111111111111111', 12345678, '0xabc123def456789012345678901234567890123456789012345678901234567890', 0, '{"from": "0x0000000000000000000000000000000000000000", "to": "0x3456789012345678901234567890123456789012", "value": "100000000000000000000"}', true)
ON CONFLICT (id) DO NOTHING;

COMMIT;
