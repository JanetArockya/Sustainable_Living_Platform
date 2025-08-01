# 🚀 Complete Cloud Deployment Guide
## Sustainable Living Platform - Backend & Frontend

## 📋 **Step-by-Step Deployment Process**

### **Phase 1: Setup MongoDB Atlas (Database)**

1. **Go to MongoDB Atlas:** https://cloud.mongodb.com/
2. **Create Account** (free tier available)
3. **Create New Cluster:**
   - Choose **FREE** shared cluster
   - Select your region (closest to you)
   - Name it: `sustainable-living`

4. **Setup Database Access:**
   - Go to "Database Access" → "Add New Database User"
   - Username: `sustainableuser`
   - Password: Generate secure password (save it!)
   - Built-in Role: `Atlas admin`

5. **Setup Network Access:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This allows Railway to connect

6. **Get Connection String:**
   - Go to "Clusters" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Should look like: `mongodb+srv://sustainableuser:yourpassword@cluster0.xxxxx.mongodb.net/sustainable_living`

---

### **Phase 2: Deploy Backend to Railway**

1. **Go to Railway:** https://railway.app/
2. **Sign up** with GitHub account
3. **Create New Project** → "Deploy from GitHub repo"
4. **Connect GitHub** and select `Sustainable_Living_Platform`
5. **Choose Backend:**
   - Root directory: `/backend`
   - Or create service for backend folder

6. **Add Environment Variables** (in Railway dashboard):
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://sustainableuser:yourpassword@cluster0.xxxxx.mongodb.net/sustainable_living
   JWT_SECRET=super-secure-jwt-secret-minimum-32-characters-here
   JWT_EXPIRE=7d
   CLIENT_URL=https://your-frontend-url.railway.app
   RATE_LIMIT_WINDOW=15
   RATE_LIMIT_MAX_REQUESTS=100
   ```

7. **Deploy:** Railway will automatically build and deploy
8. **Get Backend URL:** Copy the generated URL (e.g., `https://backend-production-xxxx.up.railway.app`)

---

### **Phase 3: Deploy Frontend to Railway**

1. **Create Another Service** in same Railway project
2. **Set Root Directory:** `/` (main folder)
3. **Add Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.railway.app
   ```

4. **Deploy:** Railway builds and deploys frontend
5. **Get Frontend URL:** Copy the generated URL

---

### **Phase 4: Update URLs**

1. **Update Backend CLIENT_URL:**
   - In Railway backend service
   - Set `CLIENT_URL` to your frontend URL

2. **Test the Application:**
   - Visit your frontend URL
   - Try registration/login
   - Check if data saves to MongoDB

---

## 🔧 **Alternative: Quick Deploy to Render**

If Railway doesn't work, use Render (also free):

1. **Go to Render:** https://render.com/
2. **Connect GitHub** repository
3. **Create Web Service** for backend:
   - Build Command: `cd backend && npm ci && npm run build`
   - Start Command: `cd backend && npm start`
   - Add same environment variables as above

4. **Create Static Site** for frontend:
   - Build Command: `npm ci && npm run build`
   - Publish Directory: `dist`

---

## 🧪 **Testing Your Deployed API**

Once deployed, test your API:

```javascript
// Test Registration (run in browser console on your deployed frontend)
const testRegistration = async () => {
  try {
    const response = await fetch('https://your-backend-url.railway.app/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPass123'
      })
    });
    
    const data = await response.json();
    console.log('Registration Result:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

testRegistration();
```

---

## ✅ **What You'll Have After Deployment:**

1. **Backend API:** Running on Railway/Render
   - User registration & authentication
   - Real MongoDB database storage
   - JWT token-based security
   - All sustainability features (challenges, carbon calc, etc.)

2. **Frontend App:** React app on Railway/Render
   - Connected to cloud backend
   - Real user accounts
   - Data persistence
   - All features working

3. **Database:** MongoDB Atlas
   - User data stored securely
   - Automatic backups
   - Scalable storage

---

## 🎯 **Ready URLs Structure:**
- **Frontend:** `https://sustainable-living-frontend.railway.app`
- **Backend API:** `https://sustainable-living-backend.railway.app`
- **Database:** MongoDB Atlas cluster

Your Sustainable Living Platform will be fully cloud-deployed and ready for your LabMentix presentation! 🌱

---

## 🚨 **Need Help?**
If you encounter issues:
1. Check Railway/Render logs for errors
2. Verify environment variables are set correctly
3. Test API endpoints individually
4. Check MongoDB Atlas connection

The deployment should take 5-10 minutes total once you have the accounts set up.
