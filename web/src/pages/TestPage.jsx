/**
 * Simple Test Page for SomaNow
 * Basic page to test if React routing works
 */

import React from 'react'

export default function TestPage() {
  console.log('🧪 SomaNow: TestPage rendering...')
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#dc2626' }}>🎉 SomaNow Test Page</h1>
      <p>If you can see this, React and routing are working!</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h2>Debug Info:</h2>
        <ul>
          <li>✅ React is rendering</li>
          <li>✅ Router is working</li>
          <li>✅ Vite dev server is running</li>
          <li>📅 Current time: {new Date().toLocaleString()}</li>
        </ul>
      </div>
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          ← Back to Home
        </a>
      </div>
    </div>
  )
}
