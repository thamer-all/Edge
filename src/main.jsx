import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GamificationProvider } from './contexts/GamificationContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <GamificationProvider>
          <App />
        </GamificationProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
