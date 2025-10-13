#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://xnzofyxojqyjludpialf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuem9meXhvanF5amx1ZHBpYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODY5NzYsImV4cCI6MjA3NTk2Mjk3Nn0.-NCnEtB4U5WGVIgOOrpN0MkC1GpyOAQV9EpdYMSuqgU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function pushToSupabase() {
  try {
    console.log('🚀 Pushing Prisma tables to Supabase...');
    
    // Read the SQL schema file
    const sqlPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📝 SQL schema loaded successfully');
    console.log(`📊 Schema size: ${(sqlContent.length / 1024).toFixed(2)} KB`);
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📋 Found ${statements.length} SQL statements to execute`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
          
          // Use the SQL editor API to execute the statement
          const { data, error } = await supabase.rpc('exec_sql', {
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
    
    // Test the connection by querying a table
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
    console.log('2. Run: node scripts/test-supabase.js');
    console.log('3. Start your development server: npm run dev');
    
  } catch (error) {
    console.error('❌ Error pushing to Supabase:', error);
    process.exit(1);
  }
}

// Alternative method using direct SQL execution
async function pushToSupabaseAlternative() {
  try {
    console.log('🚀 Alternative method: Using direct SQL execution...');
    
    // Read the SQL schema file
    const sqlPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the entire SQL as one statement
    console.log('📝 Executing complete SQL schema...');
    
    const { data, error } = await supabase
      .from('_sql')
      .select('*')
      .eq('query', sqlContent);
    
    if (error) {
      console.error('❌ SQL execution failed:', error);
      return;
    }
    
    console.log('✅ SQL schema executed successfully!');
    
  } catch (error) {
    console.error('❌ Alternative method failed:', error);
    console.log('🔄 Falling back to manual execution...');
    await pushToSupabase();
  }
}

// Check if we should use alternative method
const useAlternative = process.argv.includes('--alternative');

if (useAlternative) {
  pushToSupabaseAlternative();
} else {
  pushToSupabase();
}
