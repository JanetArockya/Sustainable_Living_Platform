import React, { useState } from 'react';

// Simple inline styles for demo
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f9ff',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    backgroundColor: '#0ea5e9',
    color: 'white',
    padding: '1rem',
    textAlign: 'center' as const
  },
  main: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  button: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0.25rem'
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  },
  activeButton: {
    backgroundColor: '#059669'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem'
  }
};

interface User {
  username: string;
  score: number;
  level: number;
}

const CompleteSustainableApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const user: User = {
    username: 'EcoWarrior',
    score: 85,
    level: 7
  };

  const Dashboard = () => (
    <div style={styles.grid}>
      <div style={styles.card}>
        <h3>🌱 Carbon Footprint</h3>
        <p style={{ fontSize: '2rem', color: '#10b981' }}>12.5 tons/year</p>
        <p>15% reduction this month</p>
      </div>
      <div style={styles.card}>
        <h3>⚡ Energy Usage</h3>
        <p style={{ fontSize: '2rem', color: '#f59e0b' }}>245 kWh</p>
        <p>8% less than last month</p>
      </div>
      <div style={styles.card}>
        <h3>💧 Water Conservation</h3>
        <p style={{ fontSize: '2rem', color: '#3b82f6' }}>1,245 gal</p>
        <p>12% more savings</p>
      </div>
      <div style={styles.card}>
        <h3>🎯 Sustainability Score</h3>
        <p style={{ fontSize: '2rem', color: '#8b5cf6' }}>{user.score}/100</p>
        <p>Level {user.level} - Eco Champion</p>
      </div>
    </div>
  );

  const Calculator = () => (
    <div style={styles.card}>
      <h3>🧮 Carbon Calculator</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label>Monthly electricity (kWh): </label>
        <input type="number" defaultValue="300" style={{ padding: '0.5rem', marginLeft: '0.5rem' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Monthly driving (miles): </label>
        <input type="number" defaultValue="1000" style={{ padding: '0.5rem', marginLeft: '0.5rem' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Flights per year: </label>
        <input type="number" defaultValue="2" style={{ padding: '0.5rem', marginLeft: '0.5rem' }} />
      </div>
      <button style={styles.button}>Calculate Footprint</button>
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '4px' }}>
        <strong>Your estimated footprint: 8.2 tons CO₂/year</strong>
        <p>That's 2.6 tons below the US average!</p>
      </div>
    </div>
  );

  const Challenges = () => (
    <div style={styles.grid}>
      <div style={styles.card}>
        <h3>🏆 Active Challenges</h3>
        <div style={{ marginBottom: '1rem' }}>
          <h4>Zero Waste Week</h4>
          <p>Eliminate single-use items for 7 days</p>
          <div style={{ backgroundColor: '#e5e7eb', height: '8px', borderRadius: '4px' }}>
            <div style={{ 
              backgroundColor: '#10b981', 
              height: '100%', 
              width: '65%', 
              borderRadius: '4px' 
            }}></div>
          </div>
          <p>65% complete - 150 points</p>
        </div>
        <div>
          <h4>Meatless March</h4>
          <p>Go vegetarian for the entire month</p>
          <div style={{ backgroundColor: '#e5e7eb', height: '8px', borderRadius: '4px' }}>
            <div style={{ 
              backgroundColor: '#f59e0b', 
              height: '100%', 
              width: '25%', 
              borderRadius: '4px' 
            }}></div>
          </div>
          <p>25% complete - 300 points</p>
        </div>
      </div>
      <div style={styles.card}>
        <h3>🎯 Available Challenges</h3>
        <div style={{ marginBottom: '1rem' }}>
          <h4>Bike to Work Week</h4>
          <p>Cycle instead of driving for a week</p>
          <button style={styles.button}>Join Challenge</button>
        </div>
        <div>
          <h4>Energy Saver Month</h4>
          <p>Reduce energy consumption by 20%</p>
          <button style={styles.button}>Join Challenge</button>
        </div>
      </div>
    </div>
  );

  const Community = () => (
    <div style={styles.grid}>
      <div style={styles.card}>
        <h3>🏅 Leaderboard</h3>
        <div style={{ marginBottom: '0.5rem' }}>1. 🥇 Sarah Johnson - 3,240 points</div>
        <div style={{ marginBottom: '0.5rem' }}>2. 🥈 Mike Chen - 3,100 points</div>
        <div style={{ marginBottom: '0.5rem' }}>3. 🥉 Emma Davis - 2,950 points</div>
        <div style={{ backgroundColor: '#f0fdf4', padding: '0.5rem', borderRadius: '4px' }}>
          4. 🌟 You (EcoWarrior) - 2,840 points
        </div>
      </div>
      <div style={styles.card}>
        <h3>💬 Community Feed</h3>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
          <strong>Sarah J.</strong> completed "Zero Waste Week" 🎉
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#6b7280' }}>2 hours ago</p>
        </div>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
          <strong>Mike C.</strong> shared a tip: "Use LED bulbs to reduce energy!"
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#6b7280' }}>4 hours ago</p>
        </div>
      </div>
    </div>
  );

  const Profile = () => (
    <div style={styles.card}>
      <h3>👤 Your Profile</h3>
      <div style={styles.grid}>
        <div>
          <h4>User Information</h4>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Level:</strong> {user.level} - Eco Champion</p>
          <p><strong>Score:</strong> {user.score}/100</p>
          <p><strong>Member Since:</strong> January 2024</p>
        </div>
        <div>
          <h4>🏆 Achievements</h4>
          <div>🌟 Carbon Neutral Week</div>
          <div>🚲 Eco Commuter</div>
          <div>⚡ Energy Saver</div>
          <div>💧 Water Guardian</div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'calculator': return <Calculator />;
      case 'challenges': return <Challenges />;
      case 'community': return <Community />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌱 Sustainable Living Platform</h1>
        <p>Welcome back, {user.username}! 🌍</p>
      </header>
      
      <main style={styles.main}>
        <nav style={styles.nav}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'calculator', label: '🧮 Calculator' },
            { id: 'challenges', label: '🏆 Challenges' },
            { id: 'community', label: '👥 Community' },
            { id: 'profile', label: '👤 Profile' }
          ].map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.button,
                ...(activeTab === tab.id ? styles.activeButton : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default CompleteSustainableApp;
