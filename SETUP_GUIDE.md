# Roadmap App - Complete Setup Guide

This guide will walk you through setting up and running the Roadmap App locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6.0 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)
- **npm** or **yarn** (comes with Node.js)

## Quick Start (Recommended)

### Option 1: Using Docker (Easiest)

If you have Docker installed, you can run everything with one command:

```bash
# Clone the repository
git clone <your-repo-url>
cd roadmap-app

# Start all services
docker-compose up -d

# The app will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

### Option 2: Manual Setup

#### Step 1: Install MongoDB

**Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will start automatically as a Windows service

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Step 2: Clone and Setup the Project

```bash
# Clone the repository
git clone <your-repo-url>
cd roadmap-app
```

#### Step 3: Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# Use any text editor (notepad, vim, nano, etc.)
notepad .env  # Windows
nano .env     # Linux/Mac

# Start the development server
npm run dev
```

The backend server should now be running on `http://localhost:5000`

#### Step 4: Setup Frontend

Open a new terminal window:

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file if needed
notepad .env  # Windows
nano .env     # Linux/Mac

# Start the development server
npm start
```

The frontend should now be running on `http://localhost:3000`

## Environment Variables

### Backend (.env)

Create a `server/.env` file with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/roadmap-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)

Create a `client/.env` file with:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Verify Installation

1. **Check MongoDB Connection:**
   ```bash
   # In a new terminal
   mongosh
   # You should see the MongoDB shell
   ```

2. **Check Backend:**
   - Open `http://localhost:5000/health` in your browser
   - You should see: `{"status":"ok"}`

3. **Check Frontend:**
   - Open `http://localhost:3000` in your browser
   - You should see the login page

## Creating Your First Account

1. Navigate to `http://localhost:3000`
2. Click "Sign up" or navigate to the register page
3. Fill in your details:
   - Full Name
   - Email Address
   - Password (minimum 6 characters)
4. Click "Create account"
5. You'll be automatically logged in and redirected to the dashboard

## Testing the Application

### Create a Test Project

1. After logging in, click "New Project" button
2. Fill in:
   - **Project Name**: "My First Project"
   - **Description**: "Testing the Roadmap App"
   - **Tags**: "test, demo" (optional)
3. Click "Create Project"
4. You'll see your project in the dashboard

### Navigate Through Stages

1. Click on your project to view details
2. Click on any stage (e.g., "Ideation")
3. Add ideas, features, or other data
4. Click "Save Changes"
5. Navigate back and try other stages

## Common Issues and Solutions

### Issue: MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Make sure MongoDB is running:
  ```bash
  # Windows
  net start MongoDB
  
  # macOS
  brew services start mongodb-community@6.0
  
  # Linux
  sudo systemctl start mongod
  ```

### Issue: Port Already in Use

**Error:** `Port 3000 is already in use` or `Port 5000 is already in use`

**Solution:**
- Kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:3000 | xargs kill -9
  ```
- Or change the port in your `.env` file

### Issue: npm install fails

**Error:** Various npm installation errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Make sure `CLIENT_URL` in server `.env` matches your frontend URL
- Restart the backend server after changing `.env`

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Changes to React files will automatically refresh the browser
- **Backend**: Using `ts-node-dev`, changes to TypeScript files will restart the server

### Database Management

**View Database:**
```bash
# Connect to MongoDB shell
mongosh

# Switch to your database
use roadmap-app

# View collections
show collections

# View users
db.users.find()

# View projects
db.projects.find()
```

**Reset Database:**
```bash
mongosh
use roadmap-app
db.dropDatabase()
```

### Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## Production Deployment

### Build for Production

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
# The build folder contains the production-ready files
```

### Deployment Platforms

**Recommended Platforms:**

1. **Vercel (Frontend):**
   - Connect your GitHub repository
   - Vercel will auto-detect React and deploy
   - Set environment variables in Vercel dashboard

2. **Heroku (Backend):**
   ```bash
   heroku create your-app-name
   heroku addons:create mongolab
   git push heroku main
   ```

3. **MongoDB Atlas (Database):**
   - Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Get connection string
   - Update `MONGODB_URI` in your backend `.env`

4. **DigitalOcean (Full Stack):**
   - Use App Platform for easy deployment
   - Or set up a Droplet with Docker

## Additional Resources

- **MongoDB Documentation**: https://docs.mongodb.com/
- **React Documentation**: https://react.dev/
- **Express Documentation**: https://expressjs.com/
- **TypeScript Documentation**: https://www.typescriptlang.org/docs/

## Getting Help

If you encounter issues:

1. Check the console for error messages
2. Review the logs:
   - Backend: Check terminal where server is running
   - Frontend: Check browser console (F12)
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed
5. Check that MongoDB is running

## Next Steps

Now that your app is running:

1. Explore all 12 roadmap stages
2. Create multiple projects
3. Invite collaborators (add user management)
4. Customize the UI to match your brand
5. Add additional features as needed

Happy building! 🚀
