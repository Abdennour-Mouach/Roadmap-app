import mongoose from 'mongoose';
import { config } from 'dotenv';
import User from './models/user.model';
import Project from './models/project.model';

config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/roadmap-app';

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@roadmapapp.com',
      password: 'demo123',
    });
    console.log('Created demo user');

    // Create sample project
    const sampleProject = await Project.create({
      name: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with AI-powered recommendations',
      owner: demoUser._id,
      tags: ['e-commerce', 'ai', 'web'],
      currentStage: 3,
      status: 'active',
      stages: {
        ideation: {
          ideas: [
            {
              title: 'AI Product Recommendations',
              description: 'Use machine learning to suggest products based on user behavior',
              scores: {
                feasibility: 8,
                impact: 9,
                innovation: 9,
              },
              notes: ['Research existing ML models', 'Consider user privacy'],
              createdAt: new Date(),
            },
            {
              title: 'Virtual Try-On Feature',
              description: 'Allow users to virtually try products using AR',
              scores: {
                feasibility: 6,
                impact: 8,
                innovation: 10,
              },
              notes: ['Requires AR SDK integration', 'High development cost'],
              createdAt: new Date(),
            },
          ],
        },
        problemDefinition: {
          problemStatement: 'Online shoppers struggle to find products that match their preferences and often face high return rates due to poor product fit.',
          personas: [
            {
              name: 'Sarah Johnson',
              age: 32,
              occupation: 'Marketing Manager',
              goals: ['Find quality products quickly', 'Avoid returns', 'Get personalized recommendations'],
              frustrations: ['Too many irrelevant product suggestions', 'Difficult to compare products', 'Uncertain about product fit'],
            },
          ],
          painPoints: [
            'High product return rates',
            'Poor product discovery',
            'Lack of personalization',
            'Difficulty in finding the right size',
          ],
          objectives: [
            {
              description: 'Reduce product return rate',
              metric: 'Return Rate',
              target: '< 10%',
            },
            {
              description: 'Increase user engagement',
              metric: 'Session Duration',
              target: '> 5 minutes',
            },
          ],
          attachments: [],
        },
        solutionDefinition: {
          solutionOverview: 'An AI-powered e-commerce platform that provides personalized product recommendations, virtual try-on capabilities, and smart sizing suggestions to reduce returns and improve customer satisfaction.',
          keyFeatures: [
            {
              name: 'AI Recommendations',
              description: 'Machine learning-based product suggestions',
              priority: 'high',
              status: 'planned',
            },
            {
              name: 'Smart Search',
              description: 'Natural language search with filters',
              priority: 'high',
              status: 'planned',
            },
            {
              name: 'Virtual Try-On',
              description: 'AR-based product visualization',
              priority: 'medium',
              status: 'planned',
            },
          ],
          alternatives: [
            {
              name: 'Traditional E-commerce',
              pros: ['Lower development cost', 'Faster time to market'],
              cons: ['Less competitive', 'Lower user engagement'],
              selected: false,
            },
            {
              name: 'AI-Powered Platform',
              pros: ['Better user experience', 'Higher conversion rates', 'Competitive advantage'],
              cons: ['Higher development cost', 'Requires ML expertise'],
              selected: true,
            },
          ],
          mvp: {
            features: ['User authentication', 'Product catalog', 'Basic recommendations', 'Shopping cart', 'Checkout'],
            timeline: '3 months',
            resources: ['2 Frontend Developers', '2 Backend Developers', '1 ML Engineer', '1 Designer'],
          },
        },
        audienceMarket: {
          marketSize: {
            tam: '$5.7 trillion',
            sam: '$500 billion',
            som: '$50 million',
          },
          segments: [
            {
              name: 'Fashion Enthusiasts',
              size: '40%',
              characteristics: ['Age 18-35', 'High online shopping frequency', 'Value personalization'],
              priority: 1,
            },
          ],
          competitors: [
            {
              name: 'Amazon',
              strengths: ['Large product catalog', 'Fast shipping', 'Prime membership'],
              weaknesses: ['Generic recommendations', 'Cluttered UI'],
              marketShare: '40%',
            },
          ],
          researchData: [],
          charts: [],
        },
        technicalSpec: {
          userStories: [
            {
              title: 'User Registration',
              asA: 'new user',
              iWant: 'to create an account',
              soThat: 'I can save my preferences and order history',
              acceptanceCriteria: ['Email validation', 'Password strength check', 'Email verification'],
              priority: 'high',
            },
          ],
          functionalRequirements: [
            'User authentication and authorization',
            'Product catalog management',
            'Shopping cart functionality',
            'Payment processing',
            'Order management',
          ],
          nonFunctionalRequirements: [
            'Page load time < 2 seconds',
            '99.9% uptime',
            'Support 10,000 concurrent users',
            'GDPR compliant',
          ],
          diagrams: [],
        },
        databaseDesign: {
          entities: [
            {
              name: 'User',
              attributes: [
                { name: 'email', type: 'string', required: true, unique: true },
                { name: 'password', type: 'string', required: true, unique: false },
                { name: 'name', type: 'string', required: true, unique: false },
                { name: 'preferences', type: 'object', required: false, unique: false },
              ],
            },
            {
              name: 'Product',
              attributes: [
                { name: 'name', type: 'string', required: true, unique: false },
                { name: 'price', type: 'number', required: true, unique: false },
                { name: 'description', type: 'string', required: true, unique: false },
                { name: 'images', type: 'array', required: true, unique: false },
              ],
            },
          ],
          relationships: [
            {
              from: 'User',
              to: 'Order',
              type: 'one-to-many',
              description: 'A user can have multiple orders',
            },
          ],
        },
        wireframe: {
          screens: [
            {
              name: 'Home Page',
              type: 'high-fidelity',
              elements: [],
              notes: 'Hero section with featured products and personalized recommendations',
            },
            {
              name: 'Product Detail',
              type: 'high-fidelity',
              elements: [],
              notes: 'Product images, description, reviews, and add to cart button',
            },
          ],
        },
        development: {
          tasks: [
            {
              title: 'Setup project structure',
              description: 'Initialize React and Node.js projects',
              status: 'done',
              priority: 'high',
              tags: ['setup'],
            },
            {
              title: 'Implement authentication',
              description: 'JWT-based authentication system',
              status: 'in-progress',
              priority: 'high',
              tags: ['backend', 'security'],
            },
            {
              title: 'Design product catalog UI',
              description: 'Create responsive product grid',
              status: 'todo',
              priority: 'medium',
              tags: ['frontend', 'ui'],
            },
          ],
          timeline: {
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-04-01'),
            milestones: [
              {
                name: 'MVP Release',
                date: new Date('2025-03-01'),
                completed: false,
              },
            ],
          },
          repositories: [
            {
              name: 'ecommerce-frontend',
              url: 'https://github.com/example/ecommerce-frontend',
              branch: 'main',
            },
          ],
          codeSnippets: [],
          bugs: [],
        },
        goToMarket: {
          launchDate: new Date('2025-04-15'),
          marketingStrategy: {
            channels: ['Social Media', 'Email Marketing', 'Content Marketing', 'Influencer Partnerships'],
            budget: '$50,000',
            campaigns: [
              {
                name: 'Launch Campaign',
                description: 'Initial product launch with early bird discounts',
                startDate: new Date('2025-04-01'),
                endDate: new Date('2025-04-30'),
                budget: '$20,000',
              },
            ],
          },
          betaTesting: {
            enabled: true,
            testers: 100,
            feedback: [],
          },
          successMetrics: [
            {
              name: 'User Signups',
              target: '10,000',
              current: '0',
            },
            {
              name: 'Conversion Rate',
              target: '3%',
              current: '0%',
            },
          ],
          launchChecklist: [
            {
              item: 'Complete beta testing',
              completed: false,
              assignee: 'QA Team',
            },
            {
              item: 'Setup payment gateway',
              completed: false,
              assignee: 'Backend Team',
            },
            {
              item: 'Prepare marketing materials',
              completed: false,
              assignee: 'Marketing Team',
            },
          ],
        },
        domainHosting: {
          domain: {
            name: 'myecommerce.com',
            provider: 'Namecheap',
            registrationDate: new Date('2025-01-15'),
            expiryDate: new Date('2026-01-15'),
            status: 'registered',
          },
          hosting: {
            provider: 'Vercel',
            plan: 'Pro',
            server: 'us-east-1',
            deploymentUrl: 'https://myecommerce.vercel.app',
            status: 'configured',
          },
          deployment: {
            platform: 'Vercel',
            lastDeployment: new Date('2025-01-20'),
            version: 'v0.1.0',
            logs: [],
          },
        },
      },
    });

    console.log('Created sample project');

    console.log('\n✅ Seed data created successfully!');
    console.log('\nDemo User Credentials:');
    console.log('Email: demo@roadmapapp.com');
    console.log('Password: demo123');
    console.log('\nYou can now login with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
