# 🚀 Getting Started with Roadmap App

Welcome! This guide will help you get Roadmap App up and running in minutes.

## 📋 What You'll Need

Before starting, make sure you have:
- ✅ **Node.js** v18 or higher ([Download](https://nodejs.org/))
- ✅ **MongoDB** v6.0 or higher ([Download](https://www.mongodb.com/try/download/community))
- ✅ **Git** ([Download](https://git-scm.com/))
- ✅ A code editor (VS Code recommended)

## ⚡ Quick Start (3 Steps)

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd roadmap-app
```

### Step 2: Choose Your Setup Method

#### Option A: Docker (Easiest) 🐳
```bash
docker-compose up -d
```
That's it! Go to http://localhost:3000

#### Option B: Manual Setup (Windows) 🪟
```bash
# Just run the start script
start.bat
```

#### Option C: Manual Setup (Mac/Linux) 🐧
```bash
# Terminal 1 - Backend
cd server
npm install
cp .env.example .env
npm run seed
npm run dev

# Terminal 2 - Frontend
cd client
npm install
cp .env.example .env
npm start
```

### Step 3: Create Your Account
1. Open http://localhost:3000
2. Click "Sign up"
3. Fill in your details
4. Start creating projects!

## 🎯 Demo Account

Want to try it first? Use these credentials:
- **Email**: demo@roadmapapp.com
- **Password**: demo123

(Available after running `npm run seed` in the server directory)

## 📖 What's Next?

### Create Your First Project
1. Click "New Project" button
2. Enter project name and description
3. Add tags (optional)
4. Click "Create Project"

### Navigate Through Stages
1. Click on your project
2. Click any stage to start working
3. Fill in the information
4. Click "Save Changes"

### Invite Team Members
1. Go to project details
2. Click "Add Member"
3. Search for users
4. Assign roles (Owner, Editor, Viewer)

## 🎨 Features to Explore

### Stage 1: Ideation
- Add ideas and score them
- Track feasibility, impact, and innovation
- Add notes to each idea

### Stage 2: Problem Definition
- Create user personas
- List pain points
- Set measurable objectives

### Stage 3: Solution Definition
- Define key features
- Compare alternatives
- Plan your MVP

### Stage 4-10: Continue Your Journey
- Market analysis
- Technical specifications
- Database design
- Wireframing
- Development tracking
- Go-to-market planning
- Domain & hosting setup

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roadmap-app
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### MongoDB Not Running?
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use?
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues?
```bash
# Clear and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation
- **[API Docs](API_DOCUMENTATION.md)** - API reference
- **[Features](FEATURES.md)** - Complete feature list
- **[Contributing](CONTRIBUTING.md)** - How to contribute

## 💡 Tips

1. **Save Often** - Changes are saved when you click "Save Changes"
2. **Use Dark Mode** - Toggle in the header
3. **Keyboard Shortcuts** - Coming soon!
4. **Export Data** - Use the export feature for backups
5. **Collaborate** - Invite team members for better results

## 🎓 Learning Resources

### Video Tutorials (Coming Soon)
- Getting Started Guide
- Creating Your First Project
- Collaboration Features
- Advanced Tips & Tricks

### Blog Posts (Coming Soon)
- Best Practices for Product Roadmapping
- How to Use Each Stage Effectively
- Team Collaboration Tips

## 🤝 Get Help

- **Issues**: [GitHub Issues](https://github.com/yourusername/roadmap-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/roadmap-app/discussions)
- **Email**: support@roadmapapp.com

## 🎉 You're Ready!

You now have everything you need to start using Roadmap App. Happy building!

---

**Need more help?** Check out our [comprehensive setup guide](SETUP_GUIDE.md) or [open an issue](https://github.com/yourusername/roadmap-app/issues).
