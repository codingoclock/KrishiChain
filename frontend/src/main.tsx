import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { Web3Provider } from './context/Web3Context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Web3Provider>
          <App />
        </Web3Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);