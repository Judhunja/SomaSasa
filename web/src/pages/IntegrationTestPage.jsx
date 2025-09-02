/**
 * Integration Test Page
 * Tests both AI and Supabase integrations
 */

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { aiClient } from '../lib/aiClient'

export default function IntegrationTestPage() {
  const [supabaseStatus, setSupabaseStatus] = useState('testing...')
  const [aiStatus, setAiStatus] = useState('testing...')
  const [testResults, setTestResults] = useState({})

  useEffect(() => {
    testIntegrations()
  }, [])

  const testSupabase = async () => {
    try {
      // Test database connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)

      if (error && error.code === '42P01') {
        // Table doesn't exist yet - that's expected for initial setup
        setSupabaseStatus('✅ Connected (tables need to be created)')
        return true
      } else if (error) {
        setSupabaseStatus(`❌ Error: ${error.message}`)
        return false
      } else {
        setSupabaseStatus('✅ Connected and working')
        return true
      }
    } catch (error) {
      setSupabaseStatus(`❌ Connection failed: ${error.message}`)
      return false
    }
  }

  const testAI = async () => {
    try {
      const response = await aiClient.ask("Hello, can you tell me about mathematics?", {
        locale: 'en',
        subject: 'mathematics'
      })

      if (response && response.answer) {
        setAiStatus('✅ AI working correctly')
        setTestResults(prev => ({ ...prev, aiResponse: response }))
        return true
      } else {
        setAiStatus('❌ AI returned invalid response')
        return false
      }
    } catch (error) {
      setAiStatus(`❌ AI failed: ${error.message}`)
      return false
    }
  }

  const testIntegrations = async () => {
    console.log('Testing integrations...')
    
    const supabaseOk = await testSupabase()
    const aiOk = await testAI()
    
    setTestResults(prev => ({
      ...prev,
      supabaseWorking: supabaseOk,
      aiWorking: aiOk,
      overall: supabaseOk && aiOk ? 'All systems working' : 'Some issues detected'
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            SomaNow Integration Tests
          </h1>

          <div className="space-y-6">
            {/* Supabase Test */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Supabase Database
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm">{supabaseStatus}</span>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                URL: {import.meta.env.VITE_SUPABASE_URL}
              </div>
            </div>

            {/* AI Test */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                AI Integration (DeepSeek)
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm">{aiStatus}</span>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                Provider: {import.meta.env.VITE_AI_PROVIDER}
              </div>
              
              {testResults.aiResponse && (
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                  <strong>Sample AI Response:</strong>
                  <p className="mt-1">{testResults.aiResponse.answer}</p>
                </div>
              )}
            </div>

            {/* Overall Status */}
            <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                Overall Status
              </h2>
              <div className="text-blue-700">
                {testResults.overall || 'Testing in progress...'}
              </div>
            </div>

            {/* Environment Variables Check */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Environment Configuration
              </h2>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium">Supabase URL:</span> 
                  <span className={import.meta.env.VITE_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}>
                    {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Supabase Anon Key:</span> 
                  <span className={import.meta.env.VITE_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}>
                    {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">AI Provider:</span> 
                  <span className={import.meta.env.VITE_AI_PROVIDER ? 'text-green-600' : 'text-red-600'}>
                    {import.meta.env.VITE_AI_PROVIDER || '❌ Missing'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">AI Key:</span> 
                  <span className={import.meta.env.VITE_AI_KEY ? 'text-green-600' : 'text-red-600'}>
                    {import.meta.env.VITE_AI_KEY ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Test Actions */}
            <div className="flex space-x-4">
              <button
                onClick={testIntegrations}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Rerun Tests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
