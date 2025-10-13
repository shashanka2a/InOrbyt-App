#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 InOrbyt Supabase Database Setup');
console.log('=====================================\n');

// Read the SQL schema
const sqlPath = path.join(__dirname, '..', 'supabase-schema.sql');
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

console.log('📋 Manual Setup Instructions:');
console.log('==============================\n');

console.log('1. 🌐 Open your Supabase Dashboard:');
console.log('   https://supabase.com/dashboard\n');

console.log('2. 📝 Navigate to SQL Editor:');
console.log('   - Click on "SQL Editor" in the left sidebar\n');

console.log('3. 📋 Copy the SQL Schema:');
console.log('   - Copy the entire content below\n');

console.log('4. ▶️  Execute the Schema:');
console.log('   - Paste the SQL into the editor');
console.log('   - Click "Run" to execute\n');

console.log('5. ✅ Verify Setup:');
console.log('   - Check the "Tables" section to see all created tables');
console.log('   - Run: node scripts/test-supabase.js\n');

console.log('📊 SQL Schema to Copy:');
console.log('======================\n');

console.log(sqlContent);

console.log('\n🎉 After running the SQL, you should see:');
console.log('✅ 12 tables created');
console.log('✅ Sample data populated');
console.log('✅ Row Level Security enabled');
console.log('✅ Indexes and constraints applied\n');

console.log('🔗 Quick Links:');
console.log('- Supabase Dashboard: https://supabase.com/dashboard');
console.log('- Your Project: https://xnzofyxojqyjludpialf.supabase.co\n');

console.log('📱 Test Commands:');
console.log('- Test connection: node scripts/test-supabase.js');
console.log('- Start dev server: npm run dev\n');
