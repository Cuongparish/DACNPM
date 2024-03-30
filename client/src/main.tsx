import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import './hooks/useTheme.tsx';

createRoot(document.getElementById('root')!).render(<App />);
