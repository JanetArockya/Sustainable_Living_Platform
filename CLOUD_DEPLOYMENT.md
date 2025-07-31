# 🚀 Cloud Backend Deployment Guide
## Sustainable Living Platform Backend Integration

### 📋 **Prerequisites**
- MongoDB Atlas account (free tier available)
- Git repository (GitHub, GitLab, or Bitbucket)
- One of these cloud platforms:
  - Railway (Recommended - Easy & Free)
  - Render (Free tier available)
  - Vercel (Great for full-stack)
  - Heroku (Paid plans only)

---

## 🌐 **Option 1: Deploy to Railway (Recommended)**

### **Step 1: Setup MongoDB Atlas**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/sustainable_living`

### **Step 2: Deploy Backend to Railway**
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Select "Deploy from GitHub repo"
4. Choose backend folder as service root
5. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sustainable_living
   JWT_SECRET=your-super-secure-secret-here
   JWT_EXPIRE=7d
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.railway.app
   ```

### **Step 3: Deploy Frontend to Railway**
1. Create new service in same project
2. Select root folder as service root
3. Add environment variables:
   ```
   VITE_API_BASE_URL=https://your-backend-url.railway.app
   ```

### **Step 4: Update URLs**
- Update `CLIENT_URL` in backend with your frontend URL
- Update `VITE_API_BASE_URL` in frontend with your backend URL

---

## 🌐 **Option 2: Deploy to Render**

### **Step 1: Setup Database**
1. Create MongoDB Atlas cluster (same as above)

### **Step 2: Deploy Backend**
1. Go to [Render](https://render.com/)
2. Connect GitHub repository
3. Create "Web Service"
4. Configure:
   ```
   Build Command: cd backend && npm ci && npm run build
   Start Command: cd backend && npm start
   ```
5. Add environment variables (same as Railway)

### **Step 3: Deploy Frontend**
1. Create "Static Site" on Render
2. Configure:
   ```
   Build Command: npm ci && npm run build
   Publish Directory: dist
   ```

---

## 🌐 **Option 3: Deploy to Vercel (Full-Stack)**

### **Step 1: Install Vercel CLI**
```bash
npm i -g vercel
```

### **Step 2: Deploy**
```bash
# From project root
vercel --prod
```

### **Step 3: Add Environment Variables**
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
# ... add all other variables
```

---

## 📱 **Mobile & Production Features**

### **Backend Features Already Implemented:**
- ✅ RESTful API with Express.js
- ✅ MongoDB integration with Mongoose
- ✅ JWT Authentication & Authorization
- ✅ Password encryption with bcrypt
- ✅ OAuth integration (Google)
- ✅ Real-time features with Socket.io
- ✅ Input validation & sanitization
- ✅ Rate limiting & security headers
- ✅ Error handling middleware
- ✅ Docker containerization

### **API Endpoints Available:**
```
POST /api/auth/register    - User registration
POST /api/auth/login       - User login
GET  /api/auth/me          - Get current user
PUT  /api/users/profile    - Update user profile
GET  /api/challenges       - Get challenges
POST /api/challenges/:id/join - Join challenge
POST /api/carbon/calculate - Calculate carbon footprint
GET  /api/community/feed   - Get community feed
GET  /api/community/leaderboard - Get leaderboard
```

---

## 🔧 **Quick Deploy Commands**

### **For Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### **For Render:**
Just connect your GitHub repo through the Render dashboard

### **For Vercel:**
```bash
# Deploy both frontend and backend
vercel --prod
```

---

## 🔒 **Security Checklist**
- [x] Environment variables secured
- [x] JWT tokens implemented
- [x] Password hashing with bcrypt
- [x] Rate limiting configured
- [x] CORS properly configured
- [x] Input validation & sanitization
- [x] Helmet security headers

---

## 📊 **Monitoring & Scaling**
- Railway: Built-in metrics and auto-scaling
- Render: Health checks and monitoring
- Vercel: Analytics and performance insights
- MongoDB Atlas: Database monitoring

---

## 🚀 **Next Steps After Deployment**

1. **Test all API endpoints**
2. **Update frontend to use production URLs**
3. **Test user registration and login**
4. **Verify data persistence**
5. **Test real-time features**
6. **Set up monitoring and alerts**

Your Sustainable Living Platform will be fully cloud-integrated with:
- ✅ User authentication & profiles stored in MongoDB
- ✅ Real-time community features
- ✅ Carbon footprint calculations
- ✅ Challenge system with progress tracking
- ✅ Scalable architecture ready for production
