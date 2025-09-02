/**
 * Minimal App Component for SomaNow Testing
 */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Simple test component
function SimpleTest() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#dc2626', fontSize: '32px', marginBottom: '20px' }}>
        🎉 SomaNow is Working!
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>
        ✅ React is rendering successfully
      </p>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>
        ✅ Vite development server is running
      </p>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        ✅ Routing is functional
      </p>
      <div style={{ backgroundColor: '#e5e7eb', padding: '15px', borderRadius: '8px' }}>
        <h2>Quick Navigation Test:</h2>
        <ul>
          <li><a href="/home" style={{ color: '#2563eb' }}>Home Page</a></li>
          <li><a href="/login" style={{ color: '#2563eb' }}>Login Page</a></li>
          <li><a href="/signup" style={{ color: '#2563eb' }}>Sign Up Page</a></li>
        </ul>
      </div>
    </div>
  )
}

// Simple home page
function SimpleHome() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fef2f2', minHeight: '100vh' }}>
      <h1 style={{ color: '#991b1b', fontSize: '48px', textAlign: 'center', marginBottom: '30px' }}>
        Welcome to SomaNow
      </h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '24px', marginBottom: '30px', color: '#7c2d12' }}>
          AI-powered learning platform for Kenya
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{ 
            backgroundColor: '#dc2626', 
            color: 'white', 
            padding: '15px 30px', 
            fontSize: '18px', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Get Started
          </button>
          <button style={{ 
            backgroundColor: '#16a34a', 
            color: 'white', 
            padding: '15px 30px', 
            fontSize: '18px', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

// Simple login page
function SimpleLogin() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '400px', margin: '50px auto', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#1e40af' }}>
          Login to SomaNow
        </h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email" 
            style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px' }}
          />
          <button 
            type="submit"
            style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '12px', 
              border: 'none', 
              borderRadius: '6px', 
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/signup" style={{ color: '#2563eb' }}>Don't have an account? Sign up</a>
        </p>
      </div>
    </div>
  )
}

// Simple signup page
function SimpleSignup() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <div style={{ maxWidth: '400px', margin: '50px auto', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#166534' }}>
          Join SomaNow
        </h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px' }}
          />
          <input 
            type="email" 
            placeholder="Email" 
            style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px' }}
          />
          <button 
            type="submit"
            style={{ 
              backgroundColor: '#16a34a', 
              color: 'white', 
              padding: '12px', 
              border: 'none', 
              borderRadius: '6px', 
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/login" style={{ color: '#16a34a' }}>Already have an account? Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default function App() {
  console.log('🚀 SomaNow: Minimal App starting...')
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimpleTest />} />
        <Route path="/home" element={<SimpleHome />} />
        <Route path="/login" element={<SimpleLogin />} />
        <Route path="/signup" element={<SimpleSignup />} />
        <Route path="*" element={<SimpleTest />} />
      </Routes>
    </Router>
  )
}
