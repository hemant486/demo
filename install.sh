#!/bin/bash

echo "🏥 Healthcare Portal - Installation Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd backend
npm install
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file. Please update with your MongoDB URI and JWT secret."
else
    echo "⚠️  .env file already exists. Skipping..."
fi
cd ..
echo ""

# Frontend setup
echo "📦 Setting up Frontend..."
cd frontend
npm install
cd ..
echo ""

echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update backend/.env with your MongoDB URI and JWT secret"
echo "2. Start MongoDB service"
echo "3. Run 'npm run dev' in backend directory"
echo "4. Run 'npm run dev' in frontend directory"
echo ""
echo "🚀 Happy coding!"
