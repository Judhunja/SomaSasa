/**
 * Authentication Context for SomaNow
 * Handles user authentication, profile management, and session state
 */

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, auth, db } from '../lib/supabase'

const AuthContext = createContext({})

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    auth.getCurrentUser()
      .then(initialUser => {
        if (initialUser) {
          setUser(initialUser)
          loadUserProfile(initialUser.id)
        }
      })
      .finally(() => setLoading(false))

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session?.user?.id)
        
        if (session?.user) {
          setUser(session.user)
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function loadUserProfile(userId) {
    try {
      setError(null)
      
      // Fetch profile data from server
      const profileData = await db.getProfile(userId)
      setProfile(profileData)
    } catch (err) {
      console.error('Error loading profile:', err)
      setError(err.message)
    }
  }

  async function signUp(userData) {
    try {
      setLoading(true)
      setError(null)
      
      const { email, password, fullName, phoneNumber, gradeLevel, role = 'student' } = userData
      
      // Create auth user
      const { user: newUser } = await auth.signUp(email, password, {
        full_name: fullName,
        phone_number: phoneNumber
      })
      
      if (newUser) {
        // Create profile record
        const profileData = {
          id: newUser.id,
          full_name: fullName,
          phone_number: phoneNumber,
          role,
          grade_level: gradeLevel,
          preferred_language: 'en',
          profile_complete: true
        }
        
        await db.updateProfile(newUser.id, profileData)
        
        setProfile(profileData)
      }
      
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function signIn(email, password) {
    try {
      setLoading(true)
      setError(null)
      
      const { user: signedInUser } = await auth.signIn(email, password)
      
      if (signedInUser) {
        await loadUserProfile(signedInUser.id)
      }
      
      return signedInUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    try {
      setLoading(true)
      setError(null)
      
      await auth.signOut()
      
      // Clear local state
      setUser(null)
      setProfile(null)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile(updates) {
    try {
      setError(null)
      
      if (!user) throw new Error('No user logged in')
      
      const updatedProfile = await db.updateProfile(user.id, updates)
      
      // Update local state
      setProfile(updatedProfile)
      
      return updatedProfile
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function resetPassword(email) {
    try {
      setError(null)
      await auth.resetPassword(email)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Helper functions
  function isAuthenticated() {
    return !!user
  }

  function hasRole(role) {
    return profile?.role === role
  }

  function isStudent() {
    return hasRole('student')
  }

  function isMentor() {
    return hasRole('mentor')
  }

  function isParent() {
    return hasRole('parent')
  }

  function isAdmin() {
    return hasRole('admin')
  }

  function getDisplayName() {
    return profile?.full_name || user?.email || 'User'
  }

  function getInitials() {
    const name = getDisplayName()
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  function canAccessContent() {
    return isAuthenticated() && (isStudent() || isMentor() || isAdmin())
  }

  function canModerate(circleId) {
    // This would need additional logic to check circle membership
    return isMentor() || isAdmin()
  }

  const value = {
    // State
    user,
    profile,
    loading,
    error,
    
    // Actions
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    
    // Helpers
    isAuthenticated,
    hasRole,
    isStudent,
    isMentor,
    isParent,
    isAdmin,
    getDisplayName,
    getInitials,
    canAccessContent,
    canModerate
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
