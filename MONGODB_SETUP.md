# 🗄️ MongoDB Atlas Configuration
## SAVE THESE DETAILS SECURELY!

## Cluster Information
- **Cluster Name:** sustainable-living-cluster
- **Region:** [YOUR_SELECTED_REGION]
- **Tier:** M0 Sandbox (Free)

## Database User Credentials
- **Username:** sustainableuser
- **Password:** [SAVE_YOUR_PASSWORD_HERE]

## Connection String Template
```
mongodb+srv://sustainableuser:[YOUR_PASSWORD]@sustainable-living-cluster.[CLUSTER_ID].mongodb.net/sustainable_living?retryWrites=true&w=majority
```

## Complete Connection String
```
[PASTE_YOUR_COMPLETE_CONNECTION_STRING_HERE]
```

## Database Name
- **Database:** sustainable_living
- **Collections:** users, challenges, communities, carbon_calculations

## Next Steps After Setup
1. ✅ Copy your complete connection string
2. ⏭️ Use this in Railway environment variables as MONGODB_URI
3. 🧪 Test connection with the deployment checker

## Security Notes
- IP Address 0.0.0.0/0 is added for cloud deployment access
- Database user has read/write permissions
- Connection uses SSL/TLS encryption
- Passwords are automatically encrypted by MongoDB
