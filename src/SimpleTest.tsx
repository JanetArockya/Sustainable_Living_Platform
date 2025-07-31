function SimpleTest() {
  console.log('🔥 SimpleTest component is rendering!');
  
  // Log to document body as well
  if (typeof document !== 'undefined') {
    document.body.style.backgroundColor = 'red';
    document.title = 'REACT IS WORKING!';
  }
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#10b981', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      <div>
        <h1>🌱 Sustainable Living Platform - TEST</h1>
        <p>React is working! The app should render here.</p>
        <p>Time: {new Date().toString()}</p>
        <p style={{ color: 'yellow', fontSize: '32px' }}>THIS SHOULD BE VISIBLE!</p>
      </div>
    </div>
  );
}

export default SimpleTest;
