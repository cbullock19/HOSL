#!/bin/bash

echo "🚀 Setting up Hands of St. Luke Pantry Volunteer App..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local from template..."
    cp env.example .env.local
            echo "⚠️  Please edit .env.local with your actual configuration values"
        echo "   Required: DATABASE_URL, SUPABASE keys, RESEND_API_KEY"
        echo "   Optional: ORG_DISPLAY_NAME, ORG_PUBLIC_URL for branding"
    echo ""
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
pnpm db:generate

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Set up your PostgreSQL database"
echo "3. Run: pnpm db:push"
echo "4. Run: pnpm db:seed"
echo "5. Run: pnpm dev"
echo ""
echo "🌐 Open http://localhost:3000 to view the app"
echo "📱 Test on mobile devices for the best experience"
echo ""
echo "📚 See README.md for detailed setup instructions"
