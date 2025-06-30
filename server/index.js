const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create tables
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      avatar TEXT,
      join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      total_points INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      preferences TEXT DEFAULT '{"notifications":true,"sustainabilityTips":true,"weeklyReports":true,"challengeUpdates":true}'
    )
  `);

  // User activity history table
  db.run(`
    CREATE TABLE IF NOT EXISTS user_activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      activity_type TEXT NOT NULL,
      activity_data TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // User goals table
  db.run(`
    CREATE TABLE IF NOT EXISTS user_goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      target_value REAL,
      current_value REAL DEFAULT 0,
      unit TEXT,
      deadline DATE,
      category TEXT,
      completed BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // User badges table
  db.run(`
    CREATE TABLE IF NOT EXISTS user_badges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      earned_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      category TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Carbon footprint data table
  db.run(`
    CREATE TABLE IF NOT EXISTS carbon_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      electricity REAL DEFAULT 0,
      heating REAL DEFAULT 0,
      cooling REAL DEFAULT 0,
      car REAL DEFAULT 0,
      public_transport REAL DEFAULT 0,
      flights REAL DEFAULT 0,
      meat REAL DEFAULT 0,
      dairy REAL DEFAULT 0,
      local_food BOOLEAN DEFAULT 0,
      total REAL DEFAULT 0,
      date DATE DEFAULT CURRENT_DATE,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Usage metrics table
  db.run(`
    CREATE TABLE IF NOT EXISTS usage_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      metric_type TEXT NOT NULL,
      value REAL NOT NULL,
      unit TEXT,
      date DATE DEFAULT CURRENT_DATE,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Insert demo users
  const demoUsers = [
    {
      email: 'demo@example.com',
      password: bcrypt.hashSync('password123', 10),
      name: 'Demo User',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      email: 'alex@example.com',
      password: bcrypt.hashSync('password123', 10),
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  demoUsers.forEach(user => {
    db.run(
      'INSERT OR IGNORE INTO users (email, password, name, avatar, total_points, level) VALUES (?, ?, ?, ?, ?, ?)',
      [user.email, user.password, user.name, user.avatar, Math.floor(Math.random() * 3000) + 1000, Math.floor(Math.random() * 8) + 1]
    );
  });

  // Insert sample goals for demo users
  const sampleGoals = [
    { title: 'Reduce Energy Usage', description: 'Cut household energy consumption by 25%', target_value: 25, unit: '%', category: 'energy' },
    { title: 'Carbon Neutral', description: 'Achieve net-zero carbon footprint', target_value: 0, unit: 'tons CO2', category: 'carbon' },
    { title: 'Water Conservation', description: 'Reduce water usage by 30%', target_value: 30, unit: '%', category: 'water' }
  ];

  sampleGoals.forEach(goal => {
    db.run(
      'INSERT OR IGNORE INTO user_goals (user_id, title, description, target_value, current_value, unit, deadline, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [1, goal.title, goal.description, goal.target_value, Math.floor(Math.random() * goal.target_value), goal.unit, '2024-12-31', goal.category]
    );
  });

  // Insert sample badges
  const sampleBadges = [
    { name: 'Energy Saver', description: 'Reduced energy consumption by 20%', category: 'energy' },
    { name: 'Carbon Crusher', description: 'Achieved carbon neutral for a month', category: 'carbon' },
    { name: 'Water Warrior', description: 'Saved 500 gallons of water', category: 'water' }
  ];

  sampleBadges.forEach(badge => {
    db.run(
      'INSERT OR IGNORE INTO user_badges (user_id, name, description, category) VALUES (?, ?, ?, ?)',
      [1, badge.name, badge.description, badge.category]
    );
  });
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Log login activity
    db.run(
      'INSERT INTO user_activities (user_id, activity_type, activity_data) VALUES (?, ?, ?)',
      [user.id, 'login', JSON.stringify({ timestamp: new Date().toISOString() })]
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        joinDate: user.join_date,
        totalPoints: user.total_points,
        level: user.level,
        preferences: JSON.parse(user.preferences)
      }
    });
  });
});

// Register route
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name],
      function(err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: 'Email already exists' });
          }
          return res.status(500).json({ error: 'Database error' });
        }

        const token = jwt.sign(
          { userId: this.lastID, email },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          token,
          user: {
            id: this.lastID,
            email,
            name,
            joinDate: new Date().toISOString(),
            totalPoints: 0,
            level: 1,
            preferences: {
              notifications: true,
              sustainabilityTips: true,
              weeklyReports: true,
              challengeUpdates: true
            }
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.user.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      joinDate: user.join_date,
      totalPoints: user.total_points,
      level: user.level,
      preferences: JSON.parse(user.preferences)
    });
  });
});

// Get user goals
app.get('/api/user/goals', authenticateToken, (req, res) => {
  db.all('SELECT * FROM user_goals WHERE user_id = ?', [req.user.userId], (err, goals) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(goals);
  });
});

// Get user badges
app.get('/api/user/badges', authenticateToken, (req, res) => {
  db.all('SELECT * FROM user_badges WHERE user_id = ?', [req.user.userId], (err, badges) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(badges);
  });
});

// Get user activity history
app.get('/api/user/activities', authenticateToken, (req, res) => {
  const { date, limit = 50 } = req.query;
  
  let query = 'SELECT * FROM user_activities WHERE user_id = ?';
  let params = [req.user.userId];
  
  if (date) {
    query += ' AND DATE(timestamp) = ?';
    params.push(date);
  }
  
  query += ' ORDER BY timestamp DESC LIMIT ?';
  params.push(parseInt(limit));

  db.all(query, params, (err, activities) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(activities);
  });
});

// Log user activity
app.post('/api/user/activity', authenticateToken, (req, res) => {
  const { activityType, activityData } = req.body;

  db.run(
    'INSERT INTO user_activities (user_id, activity_type, activity_data) VALUES (?, ?, ?)',
    [req.user.userId, activityType, JSON.stringify(activityData)],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, message: 'Activity logged successfully' });
    }
  );
});

// Save usage metrics
app.post('/api/user/metrics', authenticateToken, (req, res) => {
  const { metricType, value, unit } = req.body;

  db.run(
    'INSERT INTO usage_metrics (user_id, metric_type, value, unit) VALUES (?, ?, ?, ?)',
    [req.user.userId, metricType, value, unit],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, message: 'Metric saved successfully' });
    }
  );
});

// Get usage metrics
app.get('/api/user/metrics', authenticateToken, (req, res) => {
  const { type, startDate, endDate } = req.query;
  
  let query = 'SELECT * FROM usage_metrics WHERE user_id = ?';
  let params = [req.user.userId];
  
  if (type) {
    query += ' AND metric_type = ?';
    params.push(type);
  }
  
  if (startDate) {
    query += ' AND date >= ?';
    params.push(startDate);
  }
  
  if (endDate) {
    query += ' AND date <= ?';
    params.push(endDate);
  }
  
  query += ' ORDER BY timestamp DESC';

  db.all(query, params, (err, metrics) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(metrics);
  });
});

// Update user profile
app.put('/api/user/profile', authenticateToken, (req, res) => {
  const { name, avatar, preferences } = req.body;
  
  db.run(
    'UPDATE users SET name = ?, avatar = ?, preferences = ? WHERE id = ?',
    [name, avatar, JSON.stringify(preferences), req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Log profile update activity
      db.run(
        'INSERT INTO user_activities (user_id, activity_type, activity_data) VALUES (?, ?, ?)',
        [req.user.userId, 'profile_update', JSON.stringify({ name, avatar, preferences })]
      );
      
      res.json({ message: 'Profile updated successfully' });
    }
  );
});

// Add user goal
app.post('/api/user/goals', authenticateToken, (req, res) => {
  const { title, description, targetValue, unit, deadline, category } = req.body;
  
  db.run(
    'INSERT INTO user_goals (user_id, title, description, target_value, unit, deadline, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.user.userId, title, description, targetValue, unit, deadline, category],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Log goal creation activity
      db.run(
        'INSERT INTO user_activities (user_id, activity_type, activity_data) VALUES (?, ?, ?)',
        [req.user.userId, 'goal_created', JSON.stringify({ goalId: this.lastID, title, category })]
      );
      
      res.json({ id: this.lastID, message: 'Goal created successfully' });
    }
  );
});

// Update carbon footprint data
app.post('/api/user/carbon-data', authenticateToken, (req, res) => {
  const { electricity, heating, cooling, car, publicTransport, flights, meat, dairy, localFood, total } = req.body;
  
  db.run(
    `INSERT OR REPLACE INTO carbon_data 
     (user_id, electricity, heating, cooling, car, public_transport, flights, meat, dairy, local_food, total, date) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)`,
    [req.user.userId, electricity, heating, cooling, car, publicTransport, flights, meat, dairy, localFood, total],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Log carbon data update activity
      db.run(
        'INSERT INTO user_activities (user_id, activity_type, activity_data) VALUES (?, ?, ?)',
        [req.user.userId, 'carbon_data_update', JSON.stringify({ total, date: new Date().toISOString().split('T')[0] })]
      );
      
      res.json({ message: 'Carbon data updated successfully' });
    }
  );
});

// Get carbon footprint data
app.get('/api/user/carbon-data', authenticateToken, (req, res) => {
  db.get(
    'SELECT * FROM carbon_data WHERE user_id = ? ORDER BY date DESC LIMIT 1',
    [req.user.userId],
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(data || {});
    }
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});