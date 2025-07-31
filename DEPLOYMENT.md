# 🚀 Deployment Guide - Sustainable Living Platform

## 📋 Pre-Deployment Checklist

### ✅ Development Environment Status
- [x] Backend API built successfully
- [x] Frontend React app built successfully
- [x] MongoDB connection established
- [x] Authentication system working
- [x] Real-time Socket.io features operational
- [x] Docker configuration complete
- [x] Testing framework setup complete

### 🖥️ Local Development Servers
- **Backend**: Running on `http://localhost:5000`
- **Frontend**: Running on `http://localhost:5173`
- **Status**: Both servers operational and communicating

## 🌐 Deployment Options

### Option 1: Cloud Platform Deployment (Recommended)

#### Frontend Deployment - Vercel/Netlify
```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Backend Deployment - Railway/Render
```bash
# Deploy to Railway
npm install -g @railway/cli
railway login
railway project new
railway add
railway deploy

# Deploy to Render
# Connect GitHub repository to Render dashboard
# Auto-deploy on push to main branch
```

#### Database - MongoDB Atlas
```bash
# Already configured for cloud deployment
# Update MONGODB_URI in environment variables
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sustainable-living
```

### Option 2: VPS/Server Deployment

#### Prerequisites
- Ubuntu 20.04+ server
- Domain name (optional)
- SSL certificate (recommended)

#### Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Clone repository
git clone https://github.com/yourusername/sustainable-living-platform.git
cd sustainable-living-platform
```

#### Docker Deployment
```bash
# Production deployment with Docker
docker-compose -f docker-compose.prod.yml up -d

# Monitor logs
docker-compose logs -f
```

### Option 3: Container Registry Deployment

#### Build and Push Images
```bash
# Build frontend image
docker build -t sustainable-frontend:latest .
docker tag sustainable-frontend:latest yourdockerhub/sustainable-frontend:latest
docker push yourdockerhub/sustainable-frontend:latest

# Build backend image
cd backend
docker build -t sustainable-backend:latest .
docker tag sustainable-backend:latest yourdockerhub/sustainable-backend:latest
docker push yourdockerhub/sustainable-backend:latest
```

## ⚙️ Environment Configuration

### Production Environment Variables

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sustainable-living-prod
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-domain.com
SOCKET_CORS_ORIGIN=https://your-frontend-domain.com

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloud Storage (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=15
```

#### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_SOCKET_URL=https://your-backend-domain.com
VITE_APP_NAME=Sustainable Living Platform
VITE_APP_VERSION=1.0.0
```

## 🔒 Security Configurations

### SSL/TLS Setup
```nginx
# Nginx configuration for HTTPS
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Firewall Configuration
```bash
# UFW setup
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000
sudo ufw status
```

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Backend health check
curl https://your-api-domain.com/api/health

# Frontend availability
curl -I https://your-frontend-domain.com
```

### Log Monitoring
```bash
# Docker logs
docker-compose logs -f --tail=100

# PM2 logs (if using PM2)
pm2 logs
pm2 monit
```

### Database Backup
```bash
# MongoDB backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/sustainable-living-prod" --out="/backups/backup_$DATE"
```

## 🚀 CI/CD Pipeline (GitHub Actions)

### Deployment Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install and Build Frontend
        run: |
          npm install
          npm run build
          
      - name: Install and Build Backend
        run: |
          cd backend
          npm install
          npm run build
          
      - name: Deploy to Production
        run: |
          # Your deployment commands here
          echo "Deploying to production..."
```

## 📈 Performance Optimization

### Production Optimizations
- Enable gzip compression
- Set up CDN for static assets
- Implement Redis caching
- Database indexing optimization
- Image optimization and lazy loading

### Scaling Considerations
- Load balancer configuration
- Database replica sets
- Horizontal pod autoscaling (Kubernetes)
- Message queue implementation (Redis/RabbitMQ)

## 🎯 Post-Deployment Verification

### Functionality Tests
- [ ] User registration and login
- [ ] Carbon calculator functionality
- [ ] Community challenge participation
- [ ] Real-time features (Socket.io)
- [ ] Mobile responsiveness
- [ ] API endpoint responses
- [ ] Database operations
- [ ] Email notifications

### Performance Tests
- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms
- [ ] Concurrent user handling
- [ ] Database query optimization
- [ ] Mobile performance scores

## 📞 Support & Troubleshooting

### Common Issues
1. **CORS Errors**: Verify CORS_ORIGIN environment variables
2. **Database Connection**: Check MongoDB URI and network access
3. **Socket.io Issues**: Ensure WebSocket support and correct origins
4. **Build Failures**: Verify Node.js version and dependencies

### Contact Information
- **Technical Support**: your-email@example.com
- **Documentation**: [GitHub Wiki](https://github.com/yourusername/sustainable-living-platform/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/sustainable-living-platform/issues)

---

**🌱 Ready to make the world more sustainable? Deploy now!**
