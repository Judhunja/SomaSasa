import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// USSD State Machine
class USSDStateMachine {
  constructor(supabase) {
    this.supabase = supabase
  }

  async processRequest(phoneNumber, text, sessionId) {
    try {
      const session = await this.getOrCreateSession(phoneNumber, sessionId)
      const response = await this.handleState(session, text.trim())
      
      return response
    } catch (error) {
      console.error('USSD processing error:', error)
      return this.createResponse('END Sorry, something went wrong. Please try again later.')
    }
  }

  async getOrCreateSession(phoneNumber, sessionId) {
    // Check for existing session
    let { data: session } = await this.supabase
      .from('ussd_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (!session) {
      // Create new session
      const { data: newSession } = await this.supabase
        .from('ussd_sessions')
        .insert({
          session_id: sessionId,
          phone_number: phoneNumber,
          current_state: 'main_menu',
          data: {}
        })
        .select()
        .single()
      
      session = newSession
    }

    return session
  }

  async updateSession(sessionId, state, data) {
    await this.supabase
      .from('ussd_sessions')
      .update({
        current_state: state,
        data,
        updated_at: new Date().toISOString()
      })
      .eq('session_id', sessionId)
  }

  async handleState(session, userInput) {
    const { current_state, data, phone_number } = session

    switch (current_state) {
      case 'main_menu':
        return this.handleMainMenu(session, userInput)
      
      case 'select_child':
        return this.handleSelectChild(session, userInput)
      
      case 'child_menu':
        return this.handleChildMenu(session, userInput)
      
      case 'view_progress':
        return this.handleViewProgress(session, userInput)
      
      case 'view_subjects':
        return this.handleViewSubjects(session, userInput)
      
      case 'subject_progress':
        return this.handleSubjectProgress(session, userInput)
      
      case 'recent_activities':
        return this.handleRecentActivities(session, userInput)
      
      case 'set_reminders':
        return this.handleSetReminders(session, userInput)
      
      case 'help':
        return this.handleHelp(session, userInput)
      
      default:
        return this.handleMainMenu(session, '')
    }
  }

  async handleMainMenu(session, userInput) {
    if (userInput === '') {
      // First visit - show welcome
      const menu = `CON Welcome to Elimu Hub!
Choose an option:
1. View child progress
2. Recent activities
3. Set study reminders
4. Get help
0. Exit`

      await this.updateSession(session.session_id, 'main_menu', {})
      return this.createResponse(menu)
    }

    switch (userInput) {
      case '1':
        return this.selectChild(session)
      
      case '2':
        await this.updateSession(session.session_id, 'recent_activities', {})
        return this.showRecentActivities(session)
      
      case '3':
        await this.updateSession(session.session_id, 'set_reminders', {})
        return this.showReminderOptions(session)
      
      case '4':
        await this.updateSession(session.session_id, 'help', {})
        return this.showHelp(session)
      
      case '0':
        return this.createResponse('END Thank you for using Elimu Hub. Goodbye!')
      
      default:
        return this.createResponse('CON Invalid option. Please try again:\n1. View child progress\n2. Recent activities\n3. Set study reminders\n4. Get help\n0. Exit')
    }
  }

  async selectChild(session) {
    // Get children linked to this phone number
    const { data: children } = await this.supabase
      .from('profiles')
      .select('id, full_name, class')
      .eq('parent_phone', session.phone_number)
      .eq('role', 'student')

    if (!children || children.length === 0) {
      return this.createResponse('END No children found linked to this number. Please contact support.')
    }

    if (children.length === 1) {
      // Only one child - skip selection
      await this.updateSession(session.session_id, 'child_menu', { selected_child: children[0].id })
      return this.showChildMenu(session, children[0])
    }

    // Multiple children - show selection
    let menu = 'CON Select your child:\n'
    children.forEach((child, index) => {
      menu += `${index + 1}. ${child.full_name} (${child.class})\n`
    })
    menu += '0. Back to main menu'

    await this.updateSession(session.session_id, 'select_child', { children })
    return this.createResponse(menu)
  }

  async handleSelectChild(session, userInput) {
    const { children } = session.data
    const choice = parseInt(userInput)

    if (choice === 0) {
      await this.updateSession(session.session_id, 'main_menu', {})
      return this.handleMainMenu(session, '')
    }

    if (choice > 0 && choice <= children.length) {
      const selectedChild = children[choice - 1]
      await this.updateSession(session.session_id, 'child_menu', { selected_child: selectedChild.id })
      return this.showChildMenu(session, selectedChild)
    }

    return this.createResponse('CON Invalid choice. Please select a valid option.')
  }

  async showChildMenu(session, child) {
    const menu = `CON ${child.full_name} - ${child.class}
1. View overall progress
2. View subjects
3. Recent activities
4. Study schedule
9. Back to main menu
0. Exit`

    return this.createResponse(menu)
  }

  async handleChildMenu(session, userInput) {
    const { selected_child } = session.data

    switch (userInput) {
      case '1':
        await this.updateSession(session.session_id, 'view_progress', { selected_child })
        return this.showOverallProgress(session)
      
      case '2':
        await this.updateSession(session.session_id, 'view_subjects', { selected_child })
        return this.showSubjects(session)
      
      case '3':
        await this.updateSession(session.session_id, 'recent_activities', { selected_child })
        return this.showRecentActivities(session)
      
      case '4':
        return this.createResponse('END Study schedule feature coming soon!')
      
      case '9':
        await this.updateSession(session.session_id, 'main_menu', {})
        return this.handleMainMenu(session, '')
      
      case '0':
        return this.createResponse('END Thank you for using Elimu Hub!')
      
      default:
        return this.createResponse('CON Invalid option. Please try again.')
    }
  }

  async showOverallProgress(session) {
    const { selected_child } = session.data

    // Get overall progress
    const { data: progress } = await this.supabase
      .rpc('get_user_overall_progress', { user_id: selected_child })

    if (!progress) {
      return this.createResponse('END No progress data available yet.')
    }

    const progressText = `END Overall Progress:
Lessons completed: ${progress.completed_lessons || 0}
Quizzes taken: ${progress.completed_quizzes || 0}
Average score: ${progress.average_score || 0}%
Study streak: ${progress.study_streak || 0} days

Keep up the good work!`

    return this.createResponse(progressText)
  }

  async showSubjects(session) {
    const { selected_child } = session.data

    // Get subjects with progress
    const { data: subjects } = await this.supabase
      .rpc('get_user_subject_progress', { user_id: selected_child })

    if (!subjects || subjects.length === 0) {
      return this.createResponse('END No subjects found.')
    }

    let menu = 'CON Subjects:\n'
    subjects.slice(0, 7).forEach((subject, index) => {
      const progress = subject.progress || 0
      menu += `${index + 1}. ${subject.name} (${progress}%)\n`
    })
    menu += '0. Back'

    await this.updateSession(session.session_id, 'view_subjects', { 
      selected_child, 
      subjects: subjects.slice(0, 7) 
    })
    
    return this.createResponse(menu)
  }

  async handleViewSubjects(session, userInput) {
    const { subjects, selected_child } = session.data
    const choice = parseInt(userInput)

    if (choice === 0) {
      await this.updateSession(session.session_id, 'child_menu', { selected_child })
      return this.handleChildMenu(session, '')
    }

    if (choice > 0 && choice <= subjects.length) {
      const subject = subjects[choice - 1]
      return this.showSubjectDetails(session, subject)
    }

    return this.createResponse('CON Invalid choice. Please select a valid option.')
  }

  async showSubjectDetails(session, subject) {
    const details = `END ${subject.name} Progress:

Completed: ${subject.completed_lessons || 0}/${subject.total_lessons || 0} lessons
Average score: ${subject.average_score || 0}%
Last activity: ${this.formatDate(subject.last_activity)}

${subject.progress >= 80 ? 'Excellent progress!' : 
  subject.progress >= 60 ? 'Good progress!' : 
  'Needs more practice'}`

    return this.createResponse(details)
  }

  async showRecentActivities(session) {
    const childId = session.data.selected_child || null

    // Get recent activities
    const { data: activities } = await this.supabase
      .from('user_progress')
      .select(`
        lesson:lessons(title, subject),
        completed_at,
        score
      `)
      .eq('user_id', childId)
      .order('completed_at', { ascending: false })
      .limit(5)

    if (!activities || activities.length === 0) {
      return this.createResponse('END No recent activities found.')
    }

    let text = 'END Recent Activities:\n\n'
    activities.forEach(activity => {
      const date = this.formatDate(activity.completed_at)
      const score = activity.score ? ` (${activity.score}%)` : ''
      text += `${activity.lesson.title}${score}\n${date}\n\n`
    })

    return this.createResponse(text)
  }

  async showReminderOptions(session) {
    const menu = `CON Study Reminders:
1. Set daily reminder
2. Set weekly summary
3. View current reminders
4. Turn off reminders
0. Back to main menu`

    return this.createResponse(menu)
  }

  async handleSetReminders(session, userInput) {
    switch (userInput) {
      case '1':
        return this.createResponse('END Daily reminders will be sent at 6 PM. Feature coming soon!')
      
      case '2':
        return this.createResponse('END Weekly summaries will be sent on Sundays. Feature coming soon!')
      
      case '3':
        return this.createResponse('END No active reminders set.')
      
      case '4':
        return this.createResponse('END Reminders turned off.')
      
      case '0':
        await this.updateSession(session.session_id, 'main_menu', {})
        return this.handleMainMenu(session, '')
      
      default:
        return this.createResponse('CON Invalid option. Please try again.')
    }
  }

  async showHelp(session) {
    const helpText = `END Elimu Hub USSD Help:

This service lets you:
- Check your child's progress
- View recent activities
- Set study reminders

For technical support:
Call: 0700-ELIMU (354688)
SMS: Help to 40404

Visit elimuhub.co.ke for more features!`

    return this.createResponse(helpText)
  }

  async handleHelp(session, userInput) {
    return this.showHelp(session)
  }

  createResponse(text) {
    return { response: text }
  }

  formatDate(dateString) {
    if (!dateString) return 'Never'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString('en-KE')
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request body
    const formData = await req.formData()
    const sessionId = formData.get('sessionId')
    const serviceCode = formData.get('serviceCode')
    const phoneNumber = formData.get('phoneNumber')
    const text = formData.get('text') || ''

    console.log('USSD Request:', { sessionId, serviceCode, phoneNumber, text })

    // Validate required parameters
    if (!sessionId || !phoneNumber) {
      return new Response('Missing required parameters', { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      })
    }

    // Initialize USSD state machine
    const ussd = new USSDStateMachine(supabase)
    
    // Process the request
    const result = await ussd.processRequest(phoneNumber, text, sessionId)
    
    // Log the interaction
    await supabase
      .from('ussd_logs')
      .insert({
        session_id: sessionId,
        phone_number: phoneNumber,
        service_code: serviceCode,
        input_text: text,
        response_text: result.response,
        created_at: new Date().toISOString()
      })

    console.log('USSD Response:', result.response)

    return new Response(result.response, {
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    })

  } catch (error) {
    console.error('USSD webhook error:', error)
    
    return new Response('END Sorry, service temporarily unavailable. Please try again later.', {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    })
  }
})
