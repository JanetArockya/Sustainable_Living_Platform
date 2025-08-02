# MongoDB Atlas IP Whitelist Configuration Guide

## Issue: MongooseServerSelectionError
Your current IP address is not whitelisted in MongoDB Atlas.

## Solution 1: Allow All IPs (Easiest for Development)
1. Go to https://cloud.mongodb.com/
2. Navigate to your project/cluster
3. Click "Network Access" in left sidebar
4. Click "+ ADD IP ADDRESS"
5. Select "ALLOW ACCESS FROM ANYWHERE"
6. Enter: 0.0.0.0/0
7. Click "Confirm"
8. Wait 1-2 minutes for changes to propagate

## Solution 2: Add Specific IPs (More Secure)
Add these IP ranges for Render deployment:

### Render IP Ranges (US-West):
- 44.240.0.0/13
- 52.88.0.0/13  
- 54.244.0.0/13
- 35.160.0.0/13

### Your Current IP:
Add your current development IP address for local testing.

## Solution 3: Quick Fix - Current IP Only
1. Go to MongoDB Atlas Network Access
2. Click "+ ADD IP ADDRESS" 
3. Click "ADD CURRENT IP ADDRESS"
4. Click "Confirm"

## Testing Connection
After updating IP whitelist, test connection:
```bash
node test-mongo-connection.js
```

## Environment Variables for Render
Make sure your Render environment has:
```
MONGODB_URI=mongodb+srv://sustainableuser:yourpassword@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living
```

Note: Replace 'yourpassword' with your actual MongoDB user password.
