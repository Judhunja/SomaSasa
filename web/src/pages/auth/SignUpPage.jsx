/**
 * Sign Up Page for SomaNow
 * User registration and account creation
 */

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'

export default function SignUpPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const { t } = useI18n()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    grade: '',
    county: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.passwordMismatch'))
      setLoading(false)
      return
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
        grade: formData.grade,
        county: formData.county
      })
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
            {t('auth.signUp')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.haveAccount')}{' '}
            <Link to="/login" className="font-medium text-kenya-red hover:text-red-500">
              {t('auth.signIn')}
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
              <label htmlFor="fullName" className="block text-sm font-medium text-kenya-brown">
                {t('auth.fullName')}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kenya-red focus:border-kenya-red"
                placeholder={t('auth.fullNamePlaceholder')}
              />
            </div>
            
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
              <label htmlFor="role" className="block text-sm font-medium text-kenya-brown">
                {t('auth.role')}
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kenya-red focus:border-kenya-red"
              >
                <option value="student">{t('roles.student')}</option>
                <option value="mentor">{t('roles.mentor')}</option>
                <option value="parent">{t('roles.parent')}</option>
              </select>
            </div>

            {formData.role === 'student' && (
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-kenya-brown">
                  {t('auth.grade')}
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kenya-red focus:border-kenya-red"
                >
                  <option value="">{t('auth.selectGrade')}</option>
                  <option value="grade_1">{t('grades.grade1')}</option>
                  <option value="grade_2">{t('grades.grade2')}</option>
                  <option value="grade_3">{t('grades.grade3')}</option>
                  <option value="grade_4">{t('grades.grade4')}</option>
                  <option value="grade_5">{t('grades.grade5')}</option>
                  <option value="grade_6">{t('grades.grade6')}</option>
                  <option value="grade_7">{t('grades.grade7')}</option>
                  <option value="grade_8">{t('grades.grade8')}</option>
                  <option value="form_1">{t('grades.form1')}</option>
                  <option value="form_2">{t('grades.form2')}</option>
                  <option value="form_3">{t('grades.form3')}</option>
                  <option value="form_4">{t('grades.form4')}</option>
                </select>
              </div>
            )}

            <div>
              <label htmlFor="county" className="block text-sm font-medium text-kenya-brown">
                {t('auth.county')}
              </label>
              <select
                id="county"
                name="county"
                value={formData.county}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kenya-red focus:border-kenya-red"
              >
                <option value="">{t('auth.selectCounty')}</option>
                <option value="nairobi">Nairobi</option>
                <option value="mombasa">Mombasa</option>
                <option value="kiambu">Kiambu</option>
                <option value="nakuru">Nakuru</option>
                <option value="uasin_gishu">Uasin Gishu</option>
                {/* Add more counties as needed */}
              </select>
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-kenya-brown">
                {t('auth.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kenya-red focus:border-kenya-red"
                placeholder={t('auth.confirmPasswordPlaceholder')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-kenya-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kenya-red disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('auth.signUp')}
          </button>
        </form>
      </div>
    </div>
  )
}
