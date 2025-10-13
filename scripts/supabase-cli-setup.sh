#!/bin/bash

# Supabase CLI Setup Script
# This script will help you set up the database using Supabase CLI

echo "🚀 Setting up Supabase database with Prisma tables..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo "📋 Please install it first:"
    echo "   npm install -g supabase"
    echo "   or"
    echo "   brew install supabase/tap/supabase"
    exit 1
fi

echo "✅ Supabase CLI found"

# Check if we're in a Supabase project
if [ ! -f "supabase/config.toml" ]; then
    echo "🔧 Initializing Supabase project..."
    supabase init
fi

echo "📝 Copying SQL schema to Supabase migrations..."

# Create migrations directory if it doesn't exist
mkdir -p supabase/migrations

# Copy the schema to a migration file
cp supabase-schema.sql supabase/migrations/$(date +%Y%m%d%H%M%S)_init_inorbyt_schema.sql

echo "✅ Migration file created"

echo "🚀 Starting Supabase local development..."
supabase start

echo "📊 Applying database schema..."
supabase db reset

echo "✅ Database setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Your local Supabase is running at: http://localhost:54323"
echo "2. Test the connection: node scripts/test-supabase.js"
echo "3. Start your development server: npm run dev"
echo ""
echo "🔗 Supabase Dashboard: http://localhost:54323"
echo "📊 Database URL: postgresql://postgres:postgres@localhost:54322/postgres"
