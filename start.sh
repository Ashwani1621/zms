#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Zoo Management System${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js and try again.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm and try again.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

cd ..

# Create .env file for backend if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚙️ Creating backend .env file...${NC}"
    cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zms
JWT_SECRET=your-super-secret-jwt-key-change-in-production
EOF
    echo -e "${GREEN}✅ Backend .env file created${NC}"
fi

echo -e "${GREEN}🚀 Starting services...${NC}"
echo -e "${YELLOW}📝 Backend will run on http://localhost:5000${NC}"
echo -e "${YELLOW}📝 Frontend will run on http://localhost:3000${NC}"
echo -e "${YELLOW}📝 Press Ctrl+C to stop both services${NC}"

# Function to handle cleanup
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping services...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Services stopped${NC}"
}

# Set trap to handle script termination
trap cleanup EXIT INT TERM

# Start backend
cd backend
npm start &
BACKEND_PID=$!

# Start frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait
