#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Try different Supabase connection string formats
const connectionStrings = [
  // Direct connection
  "postgresql://postgres.xnzofyxojqyjludpialf:InOrbyt2025!@aws-0-us-west-1.pooler.supabase.com:6543/postgres",
  // Alternative format
  "postgresql://postgres:InOrbyt2025!@db.xnzofyxojqyjludpialf.supabase.co:5432/postgres",
  // Pooler format
  "postgresql://postgres.xnzofyxojqyjludpialf:InOrbyt2025!@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
];

async function tryPrismaPush() {
  console.log('🚀 Attempting to push Prisma schema to Supabase...');
  
  for (let i = 0; i < connectionStrings.length; i++) {
    const connectionString = connectionStrings[i];
    console.log(`\n📝 Trying connection string ${i + 1}/${connectionStrings.length}...`);
    console.log(`🔗 Connection: ${connectionString.replace(/:[^:]*@/, ':***@')}`);
    
    try {
      // Set environment variable
      process.env.DATABASE_URL = connectionString;
      
      console.log('📊 Generating Prisma client...');
      execSync('npx prisma generate', { 
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: connectionString }
      });
      
      console.log('📊 Pushing database schema...');
      execSync('npx prisma db push --accept-data-loss', { 
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: connectionString }
      });
      
      console.log('✅ Prisma schema pushed successfully!');
      
      // Test the connection
      console.log('\n🧪 Testing database connection...');
      try {
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(
          'https://xnzofyxojqyjludpialf.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuem9meXhvanF5amx1ZHBpYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODY5NzYsImV4cCI6MjA3NTk2Mjk3Nn0.-NCnEtB4U5WGVIgOOrpN0MkC1GpyOAQV9EpdYMSuqgU'
        );
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .limit(1);
        
        if (error) {
          console.log('⚠️  Supabase test failed:', error.message);
        } else {
          console.log('✅ Supabase connection successful!');
        }
      } catch (testError) {
        console.log('⚠️  Supabase test error:', testError.message);
      }
      
      console.log('\n🎉 Database setup completed!');
      console.log('📋 Next steps:');
      console.log('1. Run: npm run db:test');
      console.log('2. Start development: npm run dev');
      
      return true;
      
    } catch (error) {
      console.log(`❌ Connection ${i + 1} failed:`, error.message);
      if (i === connectionStrings.length - 1) {
        console.log('\n📋 All connection attempts failed.');
        console.log('🔄 Falling back to manual setup...');
        console.log('1. Run: npm run db:push');
        console.log('2. Copy the SQL schema to your Supabase dashboard');
        console.log('3. Execute the SQL manually');
        return false;
      }
    }
  }
}

tryPrismaPush();
