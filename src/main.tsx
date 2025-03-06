
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Polyfill for vibration API
if (!('vibrate' in navigator)) {
  // Use type assertion to tell TypeScript that we're adding the vibrate method
  (navigator as any).vibrate = (pattern: number | number[]) => {
    console.log('Vibration not supported. Pattern:', pattern);
    return false;
  };
}

console.log('SHE-Guardian - Women\'s Safety App starting up...');
console.log('SHE-Guardian - Suraksha Bhi, Sammaan Bhi');

createRoot(document.getElementById("root")!).render(<App />);
