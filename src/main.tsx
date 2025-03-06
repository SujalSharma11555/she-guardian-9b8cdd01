
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Polyfill for vibration API
if (!('vibrate' in navigator)) {
  navigator.vibrate = (pattern) => {
    console.log('Vibration not supported. Pattern:', pattern);
    return false;
  };
}

console.log('SHE-Guardian - Women\'s Safety App starting up...');

createRoot(document.getElementById("root")!).render(<App />);
