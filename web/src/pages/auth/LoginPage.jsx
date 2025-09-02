/**
 * Login Page for SomaNow
 * User authentication and sign-in functionality
 */

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const { t } = useI18n()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signIn(formData.email, formData.password)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-kenya-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-kenya-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EH</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-kenya-brown">
            {t('auth.signIn')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to="/signup" className="font-medium text-kenya-red hover:text-red-500">
              {t('auth.signUp')}
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-kenya-brown">
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kenya-red focus:border-kenya-red"
                placeholder={t('auth.emailPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-kenya-brown">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kenya-red focus:border-kenya-red"
                placeholder={t('auth.passwordPlaceholder')}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-kenya-red hover:text-red-500">
                {t('auth.forgotPassword')}
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-kenya-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kenya-red disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('auth.signIn')}
          </button>
        </form>
      </div>
    </div>
  )
}
