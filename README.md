# 🌱 Sustainable Living Platform

A comprehensive full-stack MERN application promoting environmental sustainability through community engagement, carbon footprint tracking, and gamified challenges.

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework with middleware
- **MongoDB** - NoSQL database with Mongoose ODM
- **TypeScript** - Type-safe development
- **JWT** - Authentication and authorization
- **Socket.io** - Real-time communication
- **Jest** - Testing framework
- **Docker** - Containerization

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework

### DevOps & Tools
- **GitHub Actions** - CI/CD pipeline
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nginx** - Reverse proxy
- **Redis** - Caching (optional)

## 🌟 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- OAuth integration (Google)
- Role-based access control
- Password encryption with bcrypt
- Secure token refresh mechanism

### 📊 Carbon Footprint Tracking
- Interactive carbon calculator
- Real-time data visualization
- Category-wise breakdowns (transport, energy, food, waste)
- Monthly trend analysis
- Goal setting and progress tracking

### 🏆 Community Challenges
- Create and join sustainability challenges
- Real-time progress updates via WebSocket
- Leaderboards and achievements
- Difficulty-based reward system
- Category filtering (carbon, energy, waste, etc.)

### 👥 Community Features
- User profiles with sustainability scores
- Community posts and discussions
- Achievement badges
- Local resource recommendations
- Shopping assistant for eco-friendly products

### 📈 Analytics Dashboard
- Personal sustainability metrics
- Carbon footprint trends
- Challenge participation statistics
- Environmental impact visualization
- Progress reports

### 🔄 Real-time Features
- Live challenge updates
- Instant notifications
- Real-time chat (community features)
- Socket.io integration

## 🏗️ Architecture

```
├── frontend/                    # React TypeScript application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Route components
│   │   ├── store/             # Redux store and slices
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service layer
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility functions
│   ├── public/                # Static assets
│   └── tests/                 # Frontend tests
│
├── backend/                    # Node.js Express API
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── config/           # Configuration files
│   │   ├── services/         # Business logic
│   │   └── tests/            # Backend tests
│   └── dist/                 # Compiled JavaScript
│
├── docker-compose.yml         # Multi-container setup
├── .github/workflows/        # CI/CD pipelines
└── docs/                     # Additional documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB 6.0+
- Docker & Docker Compose (optional)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/JanetArockya/Sustainable_Living_Platform.git
   cd Sustainable_Living_Platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Update .env with your configurations
   npm install
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ..
   npm install
   npm run dev
   ```

4. **Environment Variables**
   
   Backend (.env):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sustainable_living
   JWT_SECRET=your_secret_key
   CLIENT_URL=http://localhost:5173
   ```

### Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🧪 Testing

### Frontend Tests
```bash
npm run test              # Run tests
npm run test:coverage     # Run with coverage
```

### Backend Tests
```bash
cd backend
npm run test              # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## 📋 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Carbon Tracking
- `GET /api/carbon` - Get carbon data
- `POST /api/carbon/calculate` - Calculate footprint
- `GET /api/carbon/trends` - Get historical data

### Challenges
- `GET /api/challenges` - List challenges
- `POST /api/challenges` - Create challenge
- `POST /api/challenges/:id/join` - Join challenge

### Community
- `GET /api/community` - Get community posts
- `GET /api/community/leaderboard` - Get leaderboard
- `POST /api/community` - Create post

## 🛡️ Security Features

- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet.js security headers
- Password hashing with bcrypt
- JWT token authentication
- Environment variable protection

## 🔄 CI/CD Pipeline

GitHub Actions workflow includes:
- Automated testing (frontend & backend)
- Code quality checks (ESLint, TypeScript)
- Security scanning
- Docker image building
- Automated deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Janet Arockya** - Full Stack Developer

## 🌐 Live Demo

- **Frontend:** [https://sustainable-living-platform.vercel.app](https://sustainable-living-platform.vercel.app)
- **API:** [https://api.sustainable-living.com](https://api.sustainable-living.com)

## 📊 Project Statistics

- **Backend API Endpoints:** 25+
- **React Components:** 30+
- **Test Coverage:** 85%+
- **Performance Score:** 95+

---

**Built with ❤️ for a sustainable future 🌍**