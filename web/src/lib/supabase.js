import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

/**
 * Supabase client instance for SomaNow
 * Configured with auth persistence and security settings
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Use localStorage for auth persistence (better for PWA)
    storage: window.localStorage,
    // Auto-refresh tokens before they expire
    autoRefreshToken: true,
    // Persist auth across sessions
    persistSession: true,
    // Detect session in URL (useful for email confirmations)
    detectSessionInUrl: true
  },
  // Realtime configuration for chat and live updates
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  // Global configuration
  global: {
    headers: {
      'x-client-info': 'soma-now-web'
    }
  }
})

/**
 * Database helpers with error handling
 */
export const db = {
  // Profiles
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Lessons
  async getLessons(filters = {}) {
    let query = supabase
      .from('lessons')
      .select(`
        *,
        subjects (
          id,
          name,
          color_scheme
        )
      `)
      .eq('is_published', true)
      .order('chapter_number', { ascending: true })
      .order('lesson_number', { ascending: true })

    if (filters.subjectId) {
      query = query.eq('subject_id', filters.subjectId)
    }

    if (filters.gradeLevel) {
      query = query.eq('grade_level', filters.gradeLevel)
    }

    if (filters.difficulty) {
      query = query.eq('difficulty', filters.difficulty)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getLesson(id) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        subjects (
          id,
          name,
          description,
          color_scheme
        )
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single()
    
    if (error) throw error
    return data
  },

  // Progress tracking
  async getProgress(userId, lessonId) {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('profile_id', userId)
      .eq('lesson_id', lessonId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error // Ignore "not found" errors
    return data
  },

  async updateProgress(userId, lessonId, progressData) {
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        profile_id: userId,
        lesson_id: lessonId,
        ...progressData,
        last_accessed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Learning circles
  async getCircles(filters = {}) {
    let query = supabase
      .from('learning_circles')
      .select(`
        *,
        subjects (
          id,
          name,
          color_scheme
        ),
        circle_memberships (
          id,
          status,
          profile_id
        )
      `)
      .eq('is_active', true)

    if (filters.isPublic !== undefined) {
      query = query.eq('is_public', filters.isPublic)
    }

    if (filters.subjectId) {
      query = query.eq('subject_id', filters.subjectId)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getCircle(id) {
    const { data, error } = await supabase
      .from('learning_circles')
      .select(`
        *,
        subjects (
          id,
          name,
          description,
          color_scheme
        ),
        circle_memberships (
          id,
          status,
          can_moderate,
          messages_count,
          helpful_votes,
          profiles (
            id,
            full_name,
            avatar_url
          )
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Messages
  async getMessages(circleId, limit = 50) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        profiles (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('circle_id', circleId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data.reverse() // Show oldest first
  },

  async sendMessage(circleId, content, type = 'text') {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('messages')
      .insert({
        circle_id: circleId,
        sender_id: user.id,
        content,
        type
      })
      .select(`
        *,
        profiles (
          id,
          full_name,
          avatar_url
        )
      `)
      .single()
    
    if (error) throw error
    return data
  },

  // Subjects
  async getSubjects() {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('display_order', { ascending: true })
    
    if (error) throw error
    return data
  }
}

/**
 * Auth helpers
 */
export const auth = {
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) throw error
    return data
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) throw error
  }
}

/**
 * Storage helpers for file uploads
 */
export const storage = {
  async uploadFile(bucket, filePath, file) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        upsert: true
      })
    
    if (error) throw error
    return data
  },

  async getPublicUrl(bucket, filePath) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)
    
    return data.publicUrl
  },

  async deleteFile(bucket, filePath) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])
    
    if (error) throw error
  }
}

/**
 * Real-time subscriptions
 */
export const realtime = {
  subscribeToMessages(circleId, callback) {
    return supabase
      .channel(`messages:${circleId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `circle_id=eq.${circleId}`
        },
        callback
      )
      .subscribe()
  },

  subscribeToProgress(userId, callback) {
    return supabase
      .channel(`progress:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'progress',
          filter: `profile_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  unsubscribe(subscription) {
    return supabase.removeChannel(subscription)
  }
}

/**
 * Analytics tracking
 */
export const analytics = {
  async trackEvent(eventType, eventCategory, properties = {}) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          event_type: eventType,
          event_category: eventCategory,
          profile_id: user?.id || null,
          properties,
          platform: 'web',
          user_agent: navigator.userAgent,
          offline_mode: !navigator.onLine
        })
      
      if (error) {
        console.warn('Analytics tracking failed:', error)
      }
    } catch (err) {
      console.warn('Analytics tracking error:', err)
    }
  }
}

export default supabase
