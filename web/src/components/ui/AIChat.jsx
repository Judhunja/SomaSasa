/**
 * AI Chat Component for testing OpenAI integration
 */

import React, { useState } from 'react'
import { aiClient } from '../../lib/aiClient'

export default function AIChat() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAsk = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const result = await aiClient.ask(question, {
        locale: 'en',
        subject: 'general'
      })
      setResponse(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-kenya-brown mb-4">
        AI Tutor Chat
      </h3>
      
      <form onSubmit={handleAsk} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Ask a question:
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything about math, science, English, or Kiswahili..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kenya-red focus:border-transparent"
            rows="3"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="w-full bg-kenya-red text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Thinking...' : 'Ask AI Tutor'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {response && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h4 className="font-medium text-green-800 mb-2">AI Tutor Response:</h4>
            <p className="text-green-700 whitespace-pre-wrap">{response.answer}</p>
            
            {response.examples && response.examples.length > 0 && (
              <div className="mt-3">
                <h5 className="font-medium text-green-800 mb-1">Examples:</h5>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  {response.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            Confidence: {Math.round((response.confidence || 0) * 100)}% | 
            Category: {response.category || 'general'}
          </div>
        </div>
      )}
    </div>
  )
}
