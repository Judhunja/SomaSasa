/**
 * Lessons Page - AI Tutoring for SomaNow
 */

import React from 'react'
import { useI18n } from '../../contexts/I18nContext'
import AIChat from '../../components/ui/AIChat'

export default function LessonsPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold text-kenya-brown mb-4">
          {t('nav.lessons')} - AI Tutor
        </h1>
        <p className="text-gray-600 mb-6">
          Ask our AI tutor any questions about mathematics, science, English, or Kiswahili. 
          The AI is powered by DeepSeek and will provide personalized explanations and examples.
        </p>
        
        <AIChat />
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">How to use the AI Tutor:</h3>
        <ul className="text-blue-700 space-y-1 list-disc list-inside">
          <li>Ask questions in English or Kiswahili</li>
          <li>Be specific about what you want to learn</li>
          <li>Ask for examples or step-by-step explanations</li>
          <li>The AI will provide age-appropriate responses for Kenyan students</li>
        </ul>
      </div>
    </div>
  )
}
