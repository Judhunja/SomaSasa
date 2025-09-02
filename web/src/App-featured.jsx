/**
 * SomaNow App with Essential Features
 */

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Header Component
function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SN</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">
              SomaNow
            </span>
          </Link>
          
          <nav className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/lessons" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
              Lessons
            </Link>
            <Link to="/ai-tutor" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
              AI Tutor
            </Link>
            <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

// Home Page
function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn, Grow, Excel with SomaNow
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered education platform designed for Kenyan students. Access quality lessons, connect with peers, and get personalized AI tutoring support.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium text-lg inline-block"
            >
              Get Started
            </Link>
            <Link
              to="/lessons"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium text-lg inline-block"
            >
              Explore Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose SomaNow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600">Get personalized tutoring and instant help with AI technology.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Curriculum</h3>
              <p className="text-gray-600">Aligned with Kenyan education standards and best practices.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Circles</h3>
              <p className="text-gray-600">Connect with peers and learn together in collaborative groups.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Lessons Page
function LessonsPage() {
  const subjects = [
    { name: 'Mathematics', icon: '📊', color: 'bg-blue-500', lessons: 45 },
    { name: 'English', icon: '📚', color: 'bg-green-500', lessons: 38 },
    { name: 'Kiswahili', icon: '🗣️', color: 'bg-yellow-500', lessons: 32 },
    { name: 'Science', icon: '🔬', color: 'bg-purple-500', lessons: 41 },
    { name: 'Social Studies', icon: '🌍', color: 'bg-red-500', lessons: 29 },
    { name: 'Computer Studies', icon: '💻', color: 'bg-indigo-500', lessons: 25 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Lessons</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="text-2xl">{subject.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{subject.name}</h3>
              <p className="text-gray-600 mb-4">{subject.lessons} lessons available</p>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// AI Tutor Page
function AITutorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Tutor</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 ml-3">AI Assistant</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                <strong>AI Tutor:</strong> Hello! I'm your AI learning assistant. I can help you with:
              </p>
              <ul className="list-disc list-inside mt-2 text-blue-700">
                <li>Explaining difficult concepts</li>
                <li>Solving math problems step by step</li>
                <li>Grammar and language help</li>
                <li>Study tips and strategies</li>
              </ul>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Ask me anything about your studies..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            💡 Try asking: "Help me solve 2x + 5 = 15" or "Explain photosynthesis"
          </div>
        </div>
      </div>
    </div>
  )
}

// Login Page
function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Welcome Back to SomaNow
          </h1>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Your password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/signup" className="text-red-600 hover:text-red-700">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
export default function App() {
  console.log('🚀 SomaNow: Full-featured app starting...')
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/ai-tutor" element={<AITutorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}
