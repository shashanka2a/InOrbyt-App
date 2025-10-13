#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://xnzofyxojqyjludpialf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuem9meXhvanF5amx1ZHBpYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODY5NzYsImV4cCI6MjA3NTk2Mjk3Nn0.-NCnEtB4U5WGVIgOOrpN0MkC1GpyOAQV9EpdYMSuqgU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createSampleData() {
  try {
    console.log('🚀 Creating sample data in Supabase...');
    
    // Test connection first
    console.log('🧪 Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (testError && testError.message.includes('relation "users" does not exist')) {
      console.log('❌ Tables do not exist yet.');
      console.log('📋 Please run the SQL schema manually first:');
      console.log('1. Go to: https://supabase.com/dashboard');
      console.log('2. Click "SQL Editor"');
      console.log('3. Run: npm run db:push');
      console.log('4. Copy and paste the SQL schema');
      console.log('5. Click "Run" to execute');
      return;
    }
    
    if (testError) {
      console.log('⚠️  Connection test failed:', testError.message);
      return;
    }
    
    console.log('✅ Connection successful! Tables exist.');
    
    // Create sample users
    console.log('📝 Creating sample users...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          email: 'alice@inorbyt.io',
          display_name: 'Alice Johnson',
          username: 'alice_creator',
          bio: 'Digital artist and NFT creator',
          is_creator: true,
          is_verified: true
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          email: 'bob@inorbyt.io',
          display_name: 'Bob Smith',
          username: 'bob_artist',
          bio: 'Music producer and content creator',
          is_creator: true,
          is_verified: false
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          email: 'charlie@inorbyt.io',
          display_name: 'Charlie Brown',
          username: 'charlie_fan',
          bio: 'Crypto enthusiast and collector',
          is_creator: false,
          is_verified: false
        }
      ], { onConflict: 'id' });
    
    if (usersError) {
      console.log('⚠️  Users creation failed:', usersError.message);
    } else {
      console.log('✅ Sample users created');
    }
    
    // Create creator profiles
    console.log('📝 Creating creator profiles...');
    const { data: profiles, error: profilesError } = await supabase
      .from('creator_profiles')
      .upsert([
        {
          id: '650e8400-e29b-41d4-a716-446655440001',
          user_id: '550e8400-e29b-41d4-a716-446655440001',
          twitter_handle: 'alice_creator',
          instagram_handle: 'alice_art',
          website: 'https://alice-art.com',
          total_followers: 15000,
          total_revenue: 25000.50,
          is_public: true
        },
        {
          id: '650e8400-e29b-41d4-a716-446655440002',
          user_id: '550e8400-e29b-41d4-a716-446655440002',
          twitter_handle: 'bob_music',
          total_followers: 8500,
          total_revenue: 12000.25,
          is_public: true
        }
      ], { onConflict: 'id' });
    
    if (profilesError) {
      console.log('⚠️  Creator profiles creation failed:', profilesError.message);
    } else {
      console.log('✅ Creator profiles created');
    }
    
    // Create wallets
    console.log('📝 Creating wallets...');
    const { data: wallets, error: walletsError } = await supabase
      .from('wallets')
      .upsert([
        {
          id: '750e8400-e29b-41d4-a716-446655440001',
          user_id: '550e8400-e29b-41d4-a716-446655440001',
          address: '0x1234567890123456789012345678901234567890',
          wallet_type: 'PRIVY_EMAIL',
          is_active: true,
          is_custodial: true,
          chain_id: 8453,
          network_name: 'base'
        },
        {
          id: '750e8400-e29b-41d4-a716-446655440002',
          user_id: '550e8400-e29b-41d4-a716-446655440002',
          address: '0x2345678901234567890123456789012345678901',
          wallet_type: 'METAMASK',
          is_active: true,
          is_custodial: false,
          chain_id: 8453,
          network_name: 'base'
        },
        {
          id: '750e8400-e29b-41d4-a716-446655440003',
          user_id: '550e8400-e29b-41d4-a716-446655440003',
          address: '0x3456789012345678901234567890123456789012',
          wallet_type: 'COINBASE_WALLET',
          is_active: true,
          is_custodial: false,
          chain_id: 8453,
          network_name: 'base'
        }
      ], { onConflict: 'id' });
    
    if (walletsError) {
      console.log('⚠️  Wallets creation failed:', walletsError.message);
    } else {
      console.log('✅ Wallets created');
    }
    
    // Create creator tokens
    console.log('📝 Creating creator tokens...');
    const { data: tokens, error: tokensError } = await supabase
      .from('creator_tokens')
      .upsert([
        {
          id: '850e8400-e29b-41d4-a716-446655440001',
          creator_id: '650e8400-e29b-41d4-a716-446655440001',
          name: 'Alice Art Token',
          symbol: 'AAT',
          description: 'Exclusive access to Alice\'s digital art and behind-the-scenes content',
          total_supply: 1000000,
          current_supply: 150000,
          starting_price: 100000000000000000,
          current_price: 120000000000000000,
          max_tokens_per_fan: 1000,
          allow_future_minting: false,
          contract_address: '0x1111111111111111111111111111111111111111',
          is_deployed: true,
          total_holders: 45,
          total_volume: 5000000000000000000,
          floor_price: 115000000000000000
        },
        {
          id: '850e8400-e29b-41d4-a716-446655440002',
          creator_id: '650e8400-e29b-41d4-a716-446655440002',
          name: 'Bob Music Token',
          symbol: 'BMT',
          description: 'Access to exclusive music tracks and studio sessions',
          total_supply: 1000000,
          current_supply: 75000,
          starting_price: 50000000000000000,
          current_price: 60000000000000000,
          max_tokens_per_fan: 2000,
          allow_future_minting: true,
          contract_address: '0x2222222222222222222222222222222222222222',
          is_deployed: true,
          total_holders: 28,
          total_volume: 3000000000000000000,
          floor_price: 58000000000000000
        }
      ], { onConflict: 'id' });
    
    if (tokensError) {
      console.log('⚠️  Creator tokens creation failed:', tokensError.message);
    } else {
      console.log('✅ Creator tokens created');
    }
    
    console.log('\n🎉 Sample data creation completed!');
    console.log('📋 Next steps:');
    console.log('1. Run: npm run db:test');
    console.log('2. Start development: npm run dev');
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
    console.log('\n📋 Please run the SQL schema first:');
    console.log('1. Go to: https://supabase.com/dashboard');
    console.log('2. Click "SQL Editor"');
    console.log('3. Run: npm run db:push');
    console.log('4. Copy and paste the SQL schema');
    console.log('5. Click "Run" to execute');
  }
}

createSampleData();
