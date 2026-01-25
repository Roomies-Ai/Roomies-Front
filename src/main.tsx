import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.tsx'
import GoogleAuth from './components/auth/GoogleAuth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="279167213238-jl0r6dtbvhuesqh2kjv12rg87o870vsc.apps.googleusercontent.com">
        <GoogleAuth />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
