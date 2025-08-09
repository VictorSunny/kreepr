import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { SiteNavigationProvider } from './contexts/SiteNavigationContext';
import App from './App';

const ApiQueryProvider = lazy(() => import('./contexts/ApiQueryContext'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SiteNavigationProvider>
        <ApiQueryProvider>
          <App />
        </ApiQueryProvider>
      </SiteNavigationProvider>
    </ThemeProvider>
  </StrictMode>
);
