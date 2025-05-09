import React from 'react' 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

import { AuthProvider } from './context/AuthContext' // 🔐 On importe notre provider

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Toute l'app a accès au contexte */}
      <App />
    </AuthProvider>
  </React.StrictMode>
)
