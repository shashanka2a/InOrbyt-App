#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Supabase connection string
const DATABASE_URL = "postgresql://postgres.xnzofyxojqyjludpialf:InOrbyt2025!@aws-0-us-west-1.pooler.supabase.com:6543/postgres";

async function pushPrismaSchema() {
  try {
    console.log('🚀 Pushing Prisma schema to Supabase...');
    
    // Set environment variable
    process.env.DATABASE_URL = DATABASE_URL;
    
    console.log('📝 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log('📊 Pushing database schema...');
    execSync('npx prisma db push', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL }
    });
    
    console.log('✅ Prisma schema pushed successfully!');
    
    // Test the connection
    console.log('\n🧪 Testing database connection...');
    try {
      execSync('npx prisma db seed', { 
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL }
      });
      console.log('✅ Database seeded successfully!');
    } catch (seedError) {
      console.log('⚠️  Seeding failed (this is optional):', seedError.message);
    }
    
    console.log('\n🎉 Database setup completed!');
    console.log('📋 Next steps:');
    console.log('1. Run: npm run db:test');
    console.log('2. Start development: npm run dev');
    
  } catch (error) {
    console.error('❌ Error pushing Prisma schema:', error.message);
    console.log('\n📋 Alternative approach:');
    console.log('1. Run: npm run db:push');
    console.log('2. Copy the SQL schema to your Supabase dashboard');
    console.log('3. Execute the SQL manually');
  }
}

pushPrismaSchema();
