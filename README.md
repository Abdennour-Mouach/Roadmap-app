# 🚀 Roadmap App

A comprehensive, production-ready web application for product development roadmapping, guiding you from ideation to deployment through a structured 12-stage process.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## ✨ Overview

Roadmap App is a full-stack application designed to streamline product development by providing a structured workflow through 12 essential stages. Whether you're building a startup MVP or managing enterprise products, this app helps you organize ideas, define problems, design solutions, and track development all in one place.

## 🎯 Key Features

### 12-Stage Product Development Process
1. **Ideation** - Brainstorm and score ideas
2. **Problem Definition** - Define user personas and pain points
3. **Solution Definition** - Design features and MVP
4. **Audience & Market** - Analyze market and competition
5. **Technical Specifications** - Document requirements and user stories
6. **Database Design** - Design database schema and relationships
7. **Wireframing** - Create low and high-fidelity designs
8. **Development** - Track tasks, bugs, and code repositories
9. **Go to Market** - Plan launch strategy and marketing
10. **Domain & Hosting** - Configure deployment infrastructure

### Core Capabilities
- ✅ **Multi-Project Management** - Create and manage unlimited projects
- ✅ **Real-Time Collaboration** - Work with team members in real-time
- ✅ **Role-Based Access** - Owner, Editor, and Viewer roles
- ✅ **Progress Tracking** - Visual progress indicators for each stage
- ✅ **Dark Mode** - Beautiful dark theme support
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Export Functionality** - Export project data for reporting
- ✅ **Analytics Dashboard** - Track project metrics and team performance

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Socket.IO Client** for real-time updates
- **Lucide React** for icons
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.IO** for real-time features
- **Express Validator** for input validation

### DevOps
- **Docker** & **Docker Compose**
- **GitHub Actions** ready
- **Vercel/Netlify** deployment ready

## Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB 6.0+
- Git

## 🚀 Quick Start

### Option 1: Docker (Recommended)

The fastest way to get started:

```bash
# Clone the repository
git clone <your-repo-url>
cd roadmap-app

# Start all services with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

### Option 2: Manual Setup

**Step 1: Install MongoDB**

Make sure MongoDB is installed and running on your system. See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

**Step 2: Clone and Install**

```bash
# Clone the repository
git clone <your-repo-url>
cd roadmap-app

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

**Step 3: Configure Environment**

Create `.env` files:

**server/.env**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/roadmap-app
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

**client/.env**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Step 4: Seed Database (Optional)**

```bash
cd server
npm run seed
```

This creates a demo user:
- Email: `demo@roadmapapp.com`
- Password: `demo123`

**Step 5: Start Development Servers**

In separate terminal windows:

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
roadmap-app/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── assets/         # Images, fonts, etc.
│       ├── components/     # Reusable UI components
│       ├── features/       # Feature-based modules
│       ├── hooks/          # Custom React hooks
│       ├── layouts/        # Layout components
│       ├── lib/            # Utility functions
│       ├── pages/          # Page components
│       ├── store/          # Redux store
│       └── App.tsx         # Main App component
│
├── server/                 # Backend server
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Express middlewares
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── app.ts             # Express app setup
│
└── shared/                # Shared code between client and server
    ├── types/            # TypeScript type definitions
    └── utils/            # Shared utility functions
```

## 📖 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation and setup instructions
- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Features List](FEATURES.md)** - Comprehensive feature overview

## 🎯 Usage

### Creating Your First Project

1. **Register/Login** - Create an account or use demo credentials
2. **Create Project** - Click "New Project" and fill in details
3. **Navigate Stages** - Click on any stage to start working
4. **Save Progress** - All changes are saved automatically
5. **Collaborate** - Invite team members to work together

### Working Through Stages

Each stage is designed to be completed sequentially, but you can navigate freely:

- **Stage 1-3**: Ideation and Problem/Solution definition
- **Stage 4-6**: Market analysis and technical planning
- **Stage 7-8**: Design and development
- **Stage 9-10**: Launch and deployment

## 🔧 Development

### Available Scripts

#### Backend (server/)
```bash
npm run dev      # Start development server with hot-reload
npm start        # Start production server
npm run build    # Build TypeScript to JavaScript
npm test         # Run tests
npm run lint     # Run ESLint
npm run seed     # Seed database with demo data
```

#### Frontend (client/)
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run lint     # Run ESLint
```

### Code Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
│   ├── auth/       # Authentication pages
│   └── stages/     # 12 stage components
├── layouts/        # Layout wrappers
├── store/          # Redux store and slices
├── hooks/          # Custom React hooks
└── lib/            # Utility functions
```

## 🚢 Deployment

### Production Build

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
# Serve the build folder
```

### Deployment Platforms

#### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel --prod
```

#### Heroku (Backend)
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab

# Deploy
git push heroku main
```

#### Docker
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- UserAuth.test.ts
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Port Already in Use**
```bash
# Kill process on port 3000 or 5000
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -ti:3000 | xargs kill -9
```

**Module Not Found**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more troubleshooting tips.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Backend powered by [Express](https://expressjs.com/)
- Database by [MongoDB](https://www.mongodb.com/)

## 📧 Support

- **Documentation**: Check our comprehensive docs
- **Issues**: [GitHub Issues](https://github.com/yourusername/roadmap-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/roadmap-app/discussions)

## 🗺️ Roadmap

### Version 1.1 (Coming Soon)
- [ ] File upload functionality
- [ ] Email notifications
- [ ] Advanced search and filters
- [ ] Project templates
- [ ] Activity feed

### Version 1.2
- [ ] Comments and discussions
- [ ] @mentions
- [ ] Drag-and-drop improvements
- [ ] Calendar view
- [ ] Time tracking

### Version 2.0
- [ ] Mobile apps (iOS/Android)
- [ ] Desktop app (Electron)
- [ ] AI-powered suggestions
- [ ] Third-party integrations
- [ ] Advanced analytics

---

**Made with ❤️ for product builders everywhere**
