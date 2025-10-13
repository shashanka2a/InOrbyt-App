#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://xnzofyxojqyjludpialf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuem9meXhvanF5amx1ZHBpYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODY5NzYsImV4cCI6MjA3NTk2Mjk3Nn0.-NCnEtB4U5WGVIgOOrpN0MkC1GpyOAQV9EpdYMSuqgU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTablesDirectly() {
  try {
    console.log('🚀 Creating tables directly in Supabase...');
    
    // Read the SQL schema
    const sqlPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📝 SQL schema loaded successfully');
    console.log(`📊 Schema size: ${(sqlContent.length / 1024).toFixed(2)} KB`);
    
    // Split into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('COMMIT'));
    
    console.log(`📋 Found ${statements.length} SQL statements to execute`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Execute each statement using raw SQL
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
          
          // Use the rpc function to execute raw SQL
          const { data, error } = await supabase.rpc('exec', {
            sql: statement + ';'
          });
          
          if (error) {
            console.warn(`⚠️  Warning for statement ${i + 1}:`, error.message);
            errorCount++;
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
            successCount++;
          }
        } catch (err) {
          console.warn(`⚠️  Error executing statement ${i + 1}:`, err.message);
          errorCount++;
        }
      }
    }
    
    console.log('\n📊 Execution Summary:');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📈 Success Rate: ${((successCount / statements.length) * 100).toFixed(1)}%`);
    
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
    
    try {
      const { data: tokens, error: tokensError } = await supabase
        .from('creator_tokens')
        .select('count')
        .limit(1);
      
      if (tokensError) {
        console.log('⚠️  Creator tokens table test failed:', tokensError.message);
      } else {
        console.log('✅ Creator tokens table accessible');
      }
    } catch (err) {
      console.log('⚠️  Creator tokens table test error:', err.message);
    }
    
    console.log('\n🎉 Database setup completed!');
    console.log('📋 Next steps:');
    console.log('1. Check your Supabase dashboard to see the tables');
    console.log('2. Run: npm run db:test');
    console.log('3. Start your development server: npm run dev');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    console.log('\n🔄 Falling back to manual setup...');
    console.log('Please run: npm run db:push');
    process.exit(1);
  }
}

// Alternative method using direct table creation
async function createTablesIndividually() {
  try {
    console.log('🚀 Creating tables individually...');
    
    // Create users table
    console.log('⏳ Creating users table...');
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError && usersError.message.includes('relation "users" does not exist')) {
      console.log('📝 Users table does not exist, creating...');
      // This would require direct SQL execution
      console.log('⚠️  Direct table creation not supported via API');
      console.log('📋 Please use manual setup: npm run db:push');
      return;
    }
    
    console.log('✅ Users table exists');
    
  } catch (error) {
    console.error('❌ Error in individual table creation:', error);
    console.log('📋 Please use manual setup: npm run db:push');
  }
}

// Try direct execution first, then fallback
createTablesDirectly().catch(() => {
  console.log('\n🔄 Trying alternative method...');
  createTablesIndividually();
});
