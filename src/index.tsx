import { createRoot } from 'react-dom/client';
import App from './App';
import '@/src/styles/index.scss';
import '@/src/styles/tailwind.css';

const container = document.getElementById('app');

if (container) {
  createRoot(container).render(<App />);
}
