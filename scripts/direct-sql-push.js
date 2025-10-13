#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://xnzofyxojqyjludpialf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuem9meXhvanF5amx1ZHBpYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODY5NzYsImV4cCI6MjA3NTk2Mjk3Nn0.-NCnEtB4U5WGVIgOOrpN0MkC1GpyOAQV9EpdYMSuqgU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTablesIndividually() {
  try {
    console.log('🚀 Creating tables individually using Supabase API...');
    
    // Define table creation statements
    const tableStatements = [
      // Users table
      `CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        bio TEXT,
        avatar_url TEXT,
        is_creator BOOLEAN DEFAULT FALSE,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,
      
      // Creator profiles table
      `CREATE TABLE IF NOT EXISTS creator_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
      )`,
      
      // Wallets table
      `CREATE TABLE IF NOT EXISTS wallets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        address VARCHAR(42) UNIQUE NOT NULL,
        wallet_type VARCHAR(50) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        is_custodial BOOLEAN DEFAULT FALSE,
        chain_id INTEGER DEFAULT 8453,
        network_name VARCHAR(50) DEFAULT 'base',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,
      
      // Creator tokens table
      `CREATE TABLE IF NOT EXISTS creator_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
      )`,
      
      // Token holdings table
      `CREATE TABLE IF NOT EXISTS token_holdings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
      )`,
      
      // Transactions table
      `CREATE TABLE IF NOT EXISTS transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
      )`,
      
      // Perks table
      `CREATE TABLE IF NOT EXISTS perks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
      )`,
      
      // Perk redemptions table
      `CREATE TABLE IF NOT EXISTS perk_redemptions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        perk_id UUID NOT NULL REFERENCES perks(id) ON DELETE CASCADE,
        status VARCHAR(20) DEFAULT 'PENDING',
        redeemed_at TIMESTAMP WITH TIME ZONE,
        expires_at TIMESTAMP WITH TIME ZONE,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,
      
      // Notifications table
      `CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        data JSONB,
        action_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,
      
      // Sessions table
      `CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        user_agent TEXT,
        ip_address INET,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,
      
      // Blockchain events table
      `CREATE TABLE IF NOT EXISTS blockchain_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
      )`,
      
      // Gas payments table
      `CREATE TABLE IF NOT EXISTS gas_payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        transaction_hash VARCHAR(66) UNIQUE NOT NULL,
        amount NUMERIC(78, 0) NOT NULL,
        token_address VARCHAR(42),
        paid_by VARCHAR(42) NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`
    ];
    
    console.log(`📋 Creating ${tableStatements.length} tables...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < tableStatements.length; i++) {
      try {
        console.log(`⏳ Creating table ${i + 1}/${tableStatements.length}...`);
        
        // Use a direct SQL execution approach
        const { data, error } = await supabase
          .from('_sql')
          .select('*')
          .eq('query', tableStatements[i]);
        
        if (error) {
          console.warn(`⚠️  Warning for table ${i + 1}:`, error.message);
          errorCount++;
        } else {
          console.log(`✅ Table ${i + 1} created successfully`);
          successCount++;
        }
      } catch (err) {
        console.warn(`⚠️  Error creating table ${i + 1}:`, err.message);
        errorCount++;
      }
    }
    
    console.log('\n📊 Table Creation Summary:');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📈 Success Rate: ${((successCount / tableStatements.length) * 100).toFixed(1)}%`);
    
    // Test the connection
    console.log('\n🧪 Testing database connection...');
    
    try {
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      if (usersError) {
        console.log('⚠️  Users table test failed:', usersError.message);
      } else {
        console.log('✅ Users table accessible');
      }
    } catch (err) {
      console.log('⚠️  Users table test error:', err.message);
    }
    
    console.log('\n🎉 Database setup completed!');
    console.log('📋 Manual setup required:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Copy and paste the contents of supabase-schema.sql');
    console.log('4. Click Run to execute the schema');
    console.log('5. Test with: node scripts/test-supabase.js');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    process.exit(1);
  }
}

createTablesIndividually();
