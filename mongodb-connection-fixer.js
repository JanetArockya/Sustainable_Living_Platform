// MongoDB Connection String Fixer and Tester
console.log('🔗 MongoDB Connection String Diagnostics');
console.log('=========================================\n');

// Your provided connection string (with issues highlighted)
const providedConnectionString = 'mongodb+srv://sustainableuser:Grow_sus25 @sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living';

console.log('❌ Current connection string (has issues):');
console.log(`   ${providedConnectionString}`);
console.log('\n🔍 Issues identified:');
console.log('   1. ❌ Extra space before @sustainable-living-cluster');
console.log('   2. ❌ Placeholder xxxxx instead of actual cluster ID');

// Fixed connection string (still needs cluster ID)
const fixedConnectionString = 'mongodb+srv://sustainableuser:Grow_sus25@sustainable-living-cluster.xxxxx.mongodb.net/sustainable_living?retryWrites=true&w=majority';

console.log('\n✅ Corrected connection string format:');
console.log(`   ${fixedConnectionString}`);

console.log('\n📋 To get your correct cluster ID:');
console.log('   1. Go to https://cloud.mongodb.com/');
console.log('   2. Sign in to your MongoDB Atlas account');
console.log('   3. Click on your "sustainable-living-cluster"');
console.log('   4. Click "Connect" button');
console.log('   5. Choose "Connect your application"');
console.log('   6. Copy the connection string');
console.log('   7. Replace the <password> with: Grow_sus25');

console.log('\n🎯 The correct format should look like:');
console.log('   mongodb+srv://sustainableuser:Grow_sus25@sustainable-living-cluster.abcd1.mongodb.net/sustainable_living?retryWrites=true&w=majority');
console.log('   (where "abcd1" is your actual cluster ID)');

console.log('\n🚀 Next Steps:');
console.log('   1. Get the correct connection string from MongoDB Atlas');
console.log('   2. Update it in your Render environment variables');
console.log('   3. Redeploy your backend service');
console.log('   4. Test the backend health endpoint');

console.log('\n⚠️  Common MongoDB Atlas Issues:');
console.log('   - Cluster is still starting (can take 5-10 minutes)');
console.log('   - IP address not whitelisted (add 0.0.0.0/0 for Render)');
console.log('   - Incorrect password or username');
console.log('   - Network access restrictions');

// Test function for when we get the real connection string
console.log('\n🧪 Once you have the correct connection string, we can test it locally first:');
console.log('   1. Create a .env file in the backend directory');
console.log('   2. Add: MONGODB_URI=your_correct_connection_string');
console.log('   3. Run: node backend/mongodb-test.js');
