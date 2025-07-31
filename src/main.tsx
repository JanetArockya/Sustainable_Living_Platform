import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CompleteSustainableApp from './CompleteSustainableApp';

console.log('🔥 main.tsx is loading...');

const rootElement = document.getElementById('root');
console.log('🔥 Root element:', rootElement);

if (rootElement) {
  const root = createRoot(rootElement);
  console.log('🔥 Creating React root...');
  
  root.render(
    <StrictMode>
      <CompleteSustainableApp />
    </StrictMode>
  );
  
  console.log('🔥 React root rendered!');
} else {
  console.error('❌ Root element not found!');
}
