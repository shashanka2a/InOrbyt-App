#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://xnzofyxojqyjludpialf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuem9meXhvanF5amx1ZHBpYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODY5NzYsImV4cCI6MjA3NTk2Mjk3Nn0.-NCnEtB4U5WGVIgOOrpN0MkC1GpyOAQV9EpdYMSuqgU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabaseStatus() {
  try {
    console.log('🔍 Checking database status...');
    
    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (testError && testError.message.includes('relation "users" does not exist')) {
      console.log('❌ Database tables do not exist yet.');
      console.log('\n📋 Manual Setup Required:');
      console.log('==========================');
      console.log('1. 🌐 Open your Supabase Dashboard:');
      console.log('   https://supabase.com/dashboard');
      console.log('\n2. 📝 Navigate to SQL Editor:');
      console.log('   - Click on "SQL Editor" in the left sidebar');
      console.log('\n3. 📋 Copy the SQL Schema:');
      console.log('   - Run: npm run db:push');
      console.log('   - Copy the entire SQL output');
      console.log('\n4. ▶️  Execute the Schema:');
      console.log('   - Paste the SQL into the editor');
      console.log('   - Click "Run" to execute');
      console.log('\n5. ✅ Verify Setup:');
      console.log('   - Check the "Tables" section to see all created tables');
      console.log('   - Run: npm run db:test');
      console.log('\n6. 🚀 Start Development:');
      console.log('   - Run: npm run dev');
      
      return false;
    }
    
    if (testError) {
      console.log('⚠️  Connection test failed:', testError.message);
      return false;
    }
    
    console.log('✅ Database connection successful!');
    console.log('✅ Tables exist and are accessible');
    
    // Test specific tables
    const tables = ['users', 'creator_profiles', 'wallets', 'creator_tokens', 'transactions', 'perks'];
    let allTablesExist = true;
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ Table '${table}' not accessible:`, error.message);
          allTablesExist = false;
        } else {
          console.log(`✅ Table '${table}' accessible`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}' error:`, err.message);
        allTablesExist = false;
      }
    }
    
    if (allTablesExist) {
      console.log('\n🎉 Database is fully set up and ready!');
      console.log('📋 You can now:');
      console.log('1. Run: npm run dev');
      console.log('2. Start developing your InOrbyt app');
      return true;
    } else {
      console.log('\n⚠️  Some tables are missing or inaccessible.');
      console.log('📋 Please check your Supabase dashboard and ensure all tables are created.');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error checking database status:', error);
    return false;
  }
}

async function createSampleData() {
  try {
    console.log('\n🚀 Creating sample data...');
    
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
    
    console.log('\n🎉 Sample data creation completed!');
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  }
}

async function main() {
  console.log('🚀 InOrbyt Database Setup & Test');
  console.log('================================\n');
  
  const isDatabaseReady = await checkDatabaseStatus();
  
  if (isDatabaseReady) {
    console.log('\n🔄 Creating sample data...');
    await createSampleData();
    
    console.log('\n✅ Database setup complete!');
    console.log('📋 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Start developing your InOrbyt app');
  } else {
    console.log('\n📋 Please complete the manual setup first, then run this script again.');
  }
}

main();
