/**
 * SomaNow App with Essential Features
 */

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { getAITutorResponse, getSubjectSuggestions } from './lib/aiClient.js'

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
            <Link to="/dashboard" className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium">
              Dashboard
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
  const [selectedGrade, setSelectedGrade] = React.useState('primary-1')
  const [selectedLesson, setSelectedLesson] = React.useState(null)
  const [lessonContent, setLessonContent] = React.useState('')
  const [isLoadingLesson, setIsLoadingLesson] = React.useState(false)
  const [completedLessons, setCompletedLessons] = React.useState(new Set())
  const [showFilters, setShowFilters] = React.useState(false)
  const [selectedSubject, setSelectedSubject] = React.useState('all')
  const [selectedLevel, setSelectedLevel] = React.useState('all')
  
  const gradeOptions = [
    { value: 'primary-1', label: 'Primary 1 (Age 6-7)' },
    { value: 'primary-2', label: 'Primary 2 (Age 7-8)' },
    { value: 'primary-3', label: 'Primary 3 (Age 8-9)' },
    { value: 'primary-4', label: 'Primary 4 (Age 9-10)' },
    { value: 'primary-5', label: 'Primary 5 (Age 10-11)' },
    { value: 'primary-6', label: 'Primary 6 (Age 11-12)' },
    { value: 'primary-7', label: 'Primary 7 (Age 12-13)' },
    { value: 'primary-8', label: 'Primary 8 (Age 13-14)' },
    { value: 'secondary-1', label: 'Form 1 (Age 14-15)' },
    { value: 'secondary-2', label: 'Form 2 (Age 15-16)' },
    { value: 'secondary-3', label: 'Form 3 (Age 16-17)' },
    { value: 'secondary-4', label: 'Form 4 (Age 17-18)' }
  ]

  const generateLessonContent = async (lesson, subject, grade) => {
    setIsLoadingLesson(true)
    try {
      // Create a specific educational prompt focused on step-by-step problem solving
      const prompt = `Create a hands-on educational lesson about "${lesson.title}" for ${subject}. 

LESSON TOPIC: ${lesson.title}
SUBJECT: ${subject}

Important: Don't just give tips or general advice. Walk students through solving actual problems step by step!

Structure your lesson like this:

1. **What is ${lesson.title}?**
   - Brief, clear explanation

2. **Let's Solve Together!**
   - Present a real problem related to ${lesson.title}
   - Walk through the solution step by step
   - Show each step clearly: "Step 1: ...", "Step 2: ...", etc.
   - Use specific numbers, examples, or scenarios

3. **Your Turn to Try!**
   - Give another similar problem
   - Guide them through solving it step by step
   - Show the complete solution process

4. **Challenge Problem**
   - A slightly harder problem
   - Break it down into manageable steps
   - Show the full solution with explanations

5. **Practice Activity**
   - Something they can do right now to practice

Focus on actual problem-solving, not just explaining concepts. Use real examples with specific numbers, scenarios, or situations. Show the complete solution process for each problem.`

      console.log('Generating lesson for:', lesson.title, 'in', subject)
      
      const response = await getAITutorResponse(prompt, {
        gradeLevel: grade,
        subject: subject
      })

      console.log('AI Response received:', response)

      if (response && response.message) {
        setLessonContent(response.message)
      } else if (response && response.error) {
        console.error('AI Response error:', response.error)
        setLessonContent(`**${lesson.title}**

This lesson will teach you about ${lesson.title} in ${subject}.

Unfortunately, we're having trouble generating the full lesson content right now. Please check your internet connection and try again.

In the meantime, here are some key points to consider about ${lesson.title}:
- It's an important topic in ${subject}
- Understanding it will help you in your studies
- Practice and repetition are key to mastering it

Please try refreshing the lesson to load the complete content.`)
      } else {
        setLessonContent(`**${lesson.title}**

We're working on loading the complete lesson content for this topic. Please try again in a moment.`)
      }
    } catch (error) {
      console.error('Error generating lesson:', error)
      setLessonContent(`**Error Loading Lesson: ${lesson.title}**

We encountered an error while loading this lesson. Please check your internet connection and try again.

Error details: ${error.message}`)
    } finally {
      setIsLoadingLesson(false)
    }
  }

  const startLesson = async (lesson, subject) => {
    setSelectedLesson({ ...lesson, subject })
    await generateLessonContent(lesson, subject, selectedGrade)
  }

  const cleanAIResponse = (content) => {
    if (!content) return content
    
    let cleaned = content
    
    // Remove common AI response introductions
    cleaned = cleaned.replace(/^(Here's|Here is|I'll create|Let me create|I've created|I'll provide|Let me provide).*?lesson.*?[:\n]/i, '')
    cleaned = cleaned.replace(/^(This lesson is designed|This is a|Here's a comprehensive).*?\n/i, '')
    cleaned = cleaned.replace(/^(For [^,]+ students,?|Based on [^,]+,?|According to).*?\n/gm, '')
    cleaned = cleaned.replace(/^(I recommend|I suggest|You should|Teachers should|Students should|It's important to).*?\n/gm, '')
    cleaned = cleaned.replace(/^(Note:|Important:|Remember:).*?\n/gm, '')
    cleaned = cleaned.replace(/\*\*(Note|Remember|Important|Tip):\*\*.*?\n/gm, '')
    
    // Remove AI meta-commentary
    cleaned = cleaned.replace(/^This lesson will help.*?\n/gm, '')
    cleaned = cleaned.replace(/^By the end of this lesson.*?\n/gm, '')
    cleaned = cleaned.replace(/^This activity is designed.*?\n/gm, '')
    
    // Remove any remaining introductory phrases
    cleaned = cleaned.replace(/^(As we explore|In this lesson|Today we will|Let's begin|Let's start).*?\n/gm, '')
    
    // Clean up extra whitespace
    cleaned = cleaned.replace(/\n\n\n+/g, '\n\n')
    cleaned = cleaned.trim()
    
    return cleaned
  }

  const formatLessonContent = (content) => {
    if (!content) return content
    
    // First clean the AI response
    const cleanedContent = cleanAIResponse(content)
    
    // Convert markdown-style headers to HTML-style formatting for better display
    const formatted = cleanedContent
      .replace(/^# (.+)$/gm, '<h1 class="lesson-title">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="lesson-section">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="lesson-subsection">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^\- (.+)$/gm, '• $1')
      .replace(/^(\d+)\. (.+)$/gm, '$1. $2')
      .replace(/\n/g, '<br/>')
    
    return formatted
  }

  const closeLessonModal = () => {
    setSelectedLesson(null)
    setLessonContent('')
  }

  const markLessonComplete = (lessonTitle, subject) => {
    const lessonId = `${selectedGrade}-${subject}-${lessonTitle}`
    setCompletedLessons(prev => new Set([...prev, lessonId]))
  }

  const isLessonCompleted = (lessonTitle, subject) => {
    const lessonId = `${selectedGrade}-${subject}-${lessonTitle}`
    return completedLessons.has(lessonId)
  }

  const lessonDatabase = {
    'primary-1': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '🔢',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Counting Numbers 1-10', description: 'Learn to count and recognize numbers using objects', duration: '15 min', level: 'beginner' },
            { title: 'Simple Addition (1+1=2)', description: 'Add numbers using fingers, objects and pictures', duration: '20 min', level: 'beginner' },
            { title: 'Shapes Around Us', description: 'Identify circles, squares, triangles in our environment', duration: '18 min', level: 'beginner' },
            { title: 'Big and Small', description: 'Compare sizes of different objects and animals', duration: '15 min', level: 'beginner' },
            { title: 'Before and After Numbers', description: 'Understand number sequences up to 10', duration: '17 min', level: 'beginner' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          color: 'bg-green-500',
          lessons: [
            { title: 'ABC Song and Letters', description: 'Learn the alphabet with fun songs and movements', duration: '25 min', level: 'beginner' },
            { title: 'My Family Words', description: 'Learn words for family members: mama, baba, dada', duration: '20 min', level: 'beginner' },
            { title: 'Simple Greetings', description: 'Hello, goodbye, please, thank you in daily use', duration: '15 min', level: 'beginner' },
            { title: 'Animal Names and Sounds', description: 'Learn names of farm and wild animals', duration: '22 min', level: 'beginner' },
            { title: 'Colors in Our World', description: 'Identify and name basic colors around us', duration: '18 min', level: 'beginner' }
          ]
        },
        {
          name: 'Environmental Studies',
          icon: '🌱',
          color: 'bg-green-600',
          lessons: [
            { title: 'Parts of My Body', description: 'Learn about head, hands, legs, eyes and their uses', duration: '20 min', level: 'beginner' },
            { title: 'My Home and School', description: 'Identify places where we live, learn and play', duration: '18 min', level: 'beginner' },
            { title: 'Day and Night', description: 'Understand when we sleep, play, and go to school', duration: '15 min', level: 'beginner' },
            { title: 'Weather Today', description: 'Sunny, rainy, cloudy - what do we wear?', duration: '16 min', level: 'beginner' }
          ]
        },
        {
          name: 'Kiswahili',
          icon: '🗣️',
          color: 'bg-yellow-500',
          lessons: [
            { title: 'Salamu za Kiswahili', description: 'Basic greetings: Hujambo, Shikamoo, Asante', duration: '20 min', level: 'beginner' },
            { title: 'Familia Yangu', description: 'Family members in Kiswahili: mama, baba, ndugu', duration: '18 min', level: 'beginner' },
            { title: 'Wanyamapori', description: 'Animal names in Kiswahili with simple stories', duration: '22 min', level: 'beginner' }
          ]
        }
      ]
    },
    'primary-2': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '🔢',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Numbers 1-50', description: 'Count, read and write numbers up to 50', duration: '25 min', level: 'beginner' },
            { title: 'Addition within 20', description: 'Add two numbers with sums up to 20', duration: '30 min', level: 'beginner' },
            { title: 'Subtraction Basics', description: 'Take away objects to learn subtraction', duration: '28 min', level: 'beginner' },
            { title: 'Money Recognition', description: 'Identify Kenyan coins and their values', duration: '22 min', level: 'beginner' },
            { title: 'Measurement with Objects', description: 'Longer, shorter using pencils and books', duration: '20 min', level: 'beginner' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          color: 'bg-green-500',
          lessons: [
            { title: 'Reading Simple Words', description: 'Sound out CVC words like cat, mat, run', duration: '30 min', level: 'beginner' },
            { title: 'Writing My Name', description: 'Practice writing letters and simple words', duration: '25 min', level: 'beginner' },
            { title: 'Story Time', description: 'Listen to simple stories and answer questions', duration: '28 min', level: 'beginner' },
            { title: 'Describing Things', description: 'Use words like big, small, red, blue', duration: '20 min', level: 'beginner' }
          ]
        },
        {
          name: 'Environmental Studies',
          icon: '🌱',
          color: 'bg-green-600',
          lessons: [
            { title: 'Living and Non-living', description: 'What is alive? Plants, animals vs rocks, toys', duration: '25 min', level: 'beginner' },
            { title: 'Clean and Dirty', description: 'Importance of washing hands and keeping clean', duration: '20 min', level: 'beginner' },
            { title: 'Foods We Eat', description: 'Healthy foods from our farms and gardens', duration: '22 min', level: 'beginner' }
          ]
        }
      ]
    },
    'primary-3': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '🔢',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Numbers up to 100', description: 'Count, read, write and order numbers to 100', duration: '30 min', level: 'intermediate' },
            { title: 'Addition with Carrying', description: 'Add two-digit numbers with regrouping', duration: '35 min', level: 'intermediate' },
            { title: 'Multiplication Introduction', description: 'Repeated addition and times tables 2, 5, 10', duration: '32 min', level: 'intermediate' },
            { title: 'Time on the Clock', description: 'Read time to the hour and half hour', duration: '28 min', level: 'intermediate' },
            { title: 'Length and Weight', description: 'Measure using rulers and simple scales', duration: '25 min', level: 'intermediate' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          color: 'bg-green-500',
          lessons: [
            { title: 'Reading Comprehension', description: 'Read paragraphs and answer who, what, where', duration: '35 min', level: 'intermediate' },
            { title: 'Writing Sentences', description: 'Form complete sentences with capital letters', duration: '30 min', level: 'intermediate' },
            { title: 'Phonics and Spelling', description: 'Sound patterns and spelling common words', duration: '28 min', level: 'intermediate' },
            { title: 'Grammar Basics', description: 'Nouns, verbs and simple sentence structure', duration: '32 min', level: 'intermediate' }
          ]
        },
        {
          name: 'Science',
          icon: '🔬',
          color: 'bg-purple-500',
          lessons: [
            { title: 'Plants Around Us', description: 'Parts of plants and how they grow', duration: '30 min', level: 'intermediate' },
            { title: 'Animal Homes', description: 'Where different animals live and why', duration: '28 min', level: 'intermediate' },
            { title: 'Air and Water', description: 'Importance of clean air and water', duration: '25 min', level: 'intermediate' }
          ]
        },
        {
          name: 'Social Studies',
          icon: '🌍',
          color: 'bg-red-500',
          lessons: [
            { title: 'My School Community', description: 'People who work in our school', duration: '25 min', level: 'intermediate' },
            { title: 'Directions and Maps', description: 'North, South, East, West and simple maps', duration: '30 min', level: 'intermediate' }
          ]
        }
      ]
    },
    'primary-4': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '🔢',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Multiplication Tables (2-12)', description: 'Master multiplication facts for problem solving', duration: '35 min', level: 'intermediate' },
            { title: 'Long Division', description: 'Divide large numbers step by step', duration: '40 min', level: 'intermediate' },
            { title: 'Fractions Basics', description: 'Understand halves, quarters, thirds and eighths', duration: '32 min', level: 'intermediate' },
            { title: 'Area and Perimeter', description: 'Calculate area of rectangles and squares', duration: '30 min', level: 'intermediate' },
            { title: 'Word Problems', description: 'Solve real-life math problems step by step', duration: '38 min', level: 'intermediate' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          color: 'bg-green-500',
          lessons: [
            { title: 'Reading Comprehension', description: 'Understand stories and answer detailed questions', duration: '35 min', level: 'intermediate' },
            { title: 'Grammar: Tenses', description: 'Past, present, and future tenses in context', duration: '30 min', level: 'intermediate' },
            { title: 'Creative Writing', description: 'Write your own short stories with structure', duration: '40 min', level: 'intermediate' },
            { title: 'Vocabulary Building', description: 'Learn new words and use them in sentences', duration: '25 min', level: 'intermediate' }
          ]
        },
        {
          name: 'Science',
          icon: '🔬',
          color: 'bg-purple-500',
          lessons: [
            { title: 'Plants and Animals', description: 'Living things and their characteristics', duration: '30 min', level: 'intermediate' },
            { title: 'States of Matter', description: 'Solid, liquid, and gas with examples', duration: '32 min', level: 'intermediate' },
            { title: 'Simple Machines', description: 'Levers, pulleys, and wheels in daily life', duration: '35 min', level: 'intermediate' },
            { title: 'Weather Patterns', description: 'Rain, sunshine, wind and seasonal changes', duration: '28 min', level: 'intermediate' }
          ]
        },
        {
          name: 'Social Studies',
          icon: '🌍',
          color: 'bg-red-500',
          lessons: [
            { title: 'Map Reading Skills', description: 'Understand symbols, scale and directions', duration: '30 min', level: 'intermediate' },
            { title: 'Kenya Our Country', description: 'Counties, cultures and national symbols', duration: '35 min', level: 'intermediate' },
            { title: 'Community Helpers', description: 'People who help in our community and their roles', duration: '25 min', level: 'intermediate' }
          ]
        }
      ]
    },
    'primary-5': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '🔢',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Decimals and Place Value', description: 'Understanding decimal points and place value', duration: '35 min', level: 'intermediate' },
            { title: 'Advanced Fractions', description: 'Adding, subtracting and comparing fractions', duration: '40 min', level: 'intermediate' },
            { title: 'Geometry Basics', description: 'Angles, polygons and their properties', duration: '32 min', level: 'intermediate' },
            { title: 'Data Collection', description: 'Surveys, tables and simple graphs', duration: '30 min', level: 'intermediate' },
            { title: 'Problem Solving Strategies', description: 'Multiple steps and different approaches', duration: '38 min', level: 'intermediate' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          color: 'bg-green-500',
          lessons: [
            { title: 'Literature Analysis', description: 'Understanding characters, plot and setting', duration: '40 min', level: 'intermediate' },
            { title: 'Essay Writing Structure', description: 'Introduction, body and conclusion', duration: '45 min', level: 'intermediate' },
            { title: 'Advanced Grammar', description: 'Complex sentences and punctuation', duration: '35 min', level: 'intermediate' },
            { title: 'Research Skills', description: 'Finding and using information from books', duration: '30 min', level: 'intermediate' }
          ]
        },
        {
          name: 'Science',
          icon: '🔬',
          color: 'bg-purple-500',
          lessons: [
            { title: 'Human Body Systems', description: 'Basic body systems and their functions', duration: '35 min', level: 'intermediate' },
            { title: 'Energy and Forces', description: 'Different types of energy and simple forces', duration: '32 min', level: 'intermediate' },
            { title: 'Environmental Conservation', description: 'Protecting our environment and wildlife', duration: '30 min', level: 'intermediate' }
          ]
        }
      ]
    },
    'primary-6': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '🔢',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Ratio and Proportion', description: 'Understanding ratios in real-life situations', duration: '40 min', level: 'advanced' },
            { title: 'Percentage Calculations', description: 'Finding percentages of amounts', duration: '38 min', level: 'advanced' },
            { title: 'Coordinate Geometry', description: 'Plotting points on coordinate planes', duration: '35 min', level: 'advanced' },
            { title: 'Volume and Capacity', description: 'Calculating volume of boxes and containers', duration: '32 min', level: 'advanced' },
            { title: 'Algebraic Thinking', description: 'Using letters to represent numbers', duration: '35 min', level: 'advanced' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          color: 'bg-green-500',
          lessons: [
            { title: 'Debate and Discussion', description: 'Presenting arguments and listening skills', duration: '40 min', level: 'advanced' },
            { title: 'Poetry Appreciation', description: 'Understanding rhythm, rhyme and meaning', duration: '35 min', level: 'advanced' },
            { title: 'Report Writing', description: 'Writing factual reports with evidence', duration: '45 min', level: 'advanced' },
            { title: 'Critical Reading', description: 'Analyzing texts for bias and opinion', duration: '38 min', level: 'advanced' }
          ]
        }
      ]
    },
    'primary-7': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '🔢',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Advanced Algebra', description: 'Solving equations with one variable', duration: '42 min', level: 'advanced' },
            { title: 'Trigonometry Introduction', description: 'Basic concepts of angles and triangles', duration: '40 min', level: 'advanced' },
            { title: 'Statistics and Probability', description: 'Mean, median, mode and simple probability', duration: '38 min', level: 'advanced' },
            { title: 'Financial Mathematics', description: 'Simple interest, profit and loss', duration: '35 min', level: 'advanced' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          color: 'bg-green-500',
          lessons: [
            { title: 'Advanced Composition', description: 'Narrative, descriptive and argumentative writing', duration: '45 min', level: 'advanced' },
            { title: 'Literature Devices', description: 'Metaphor, simile, irony in texts', duration: '40 min', level: 'advanced' },
            { title: 'Oral Skills', description: 'Presentations and public speaking', duration: '35 min', level: 'advanced' }
          ]
        }
      ]
    },
    'primary-8': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '📐',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Algebra Mastery', description: 'Complex equations and inequalities', duration: '45 min', level: 'advanced' },
            { title: 'Geometry: Angles and Triangles', description: 'Advanced geometric calculations', duration: '40 min', level: 'advanced' },
            { title: 'Advanced Percentages', description: 'Compound interest and percentage change', duration: '35 min', level: 'advanced' },
            { title: 'Data Analysis', description: 'Complex graphs and statistical interpretation', duration: '38 min', level: 'advanced' },
            { title: 'KCPE Preparation', description: 'Exam techniques and practice papers', duration: '50 min', level: 'advanced' }
          ]
        },
        {
          name: 'English',
          icon: '✍️',
          color: 'bg-green-500',
          lessons: [
            { title: 'Advanced Essay Writing', description: 'Complex essay structures and techniques', duration: '45 min', level: 'advanced' },
            { title: 'Poetry Analysis', description: 'Deep interpretation of poems', duration: '40 min', level: 'advanced' },
            { title: 'Grammar Mastery', description: 'Complex grammar rules and exceptions', duration: '35 min', level: 'advanced' },
            { title: 'KCPE English Preparation', description: 'Exam strategies and practice', duration: '50 min', level: 'advanced' }
          ]
        },
        {
          name: 'Science',
          icon: '⚗️',
          color: 'bg-purple-500',
          lessons: [
            { title: 'Advanced Human Biology', description: 'Detailed body systems and health', duration: '40 min', level: 'advanced' },
            { title: 'Chemical Reactions', description: 'Basic chemistry and reactions', duration: '38 min', level: 'advanced' },
            { title: 'Physics Principles', description: 'Force, motion and energy', duration: '35 min', level: 'advanced' },
            { title: 'Environmental Science', description: 'Ecosystems and conservation', duration: '32 min', level: 'advanced' }
          ]
        }
      ]
    },
    'secondary-1': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '∑',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Numbers and Numeration', description: 'Number systems and operations', duration: '45 min', level: 'advanced' },
            { title: 'Algebra Foundations', description: 'Linear equations and expressions', duration: '50 min', level: 'advanced' },
            { title: 'Geometry and Measurement', description: 'Properties of shapes and measurement', duration: '45 min', level: 'advanced' },
            { title: 'Statistics Introduction', description: 'Data collection and presentation', duration: '40 min', level: 'advanced' }
          ]
        },
        {
          name: 'Biology',
          icon: '🧬',
          color: 'bg-green-600',
          lessons: [
            { title: 'Introduction to Biology', description: 'What is life? Characteristics of living things', duration: '45 min', level: 'advanced' },
            { title: 'Cell Structure and Function', description: 'Plant and animal cells', duration: '50 min', level: 'advanced' },
            { title: 'Classification of Living Things', description: 'Taxonomy and classification systems', duration: '45 min', level: 'advanced' }
          ]
        },
        {
          name: 'Chemistry',
          icon: '⚛️',
          color: 'bg-yellow-600',
          lessons: [
            { title: 'Introduction to Chemistry', description: 'Matter and its properties', duration: '45 min', level: 'advanced' },
            { title: 'Atomic Structure', description: 'Atoms, elements and compounds', duration: '50 min', level: 'advanced' },
            { title: 'Chemical Reactions', description: 'Types of chemical reactions', duration: '45 min', level: 'advanced' }
          ]
        },
        {
          name: 'Physics',
          icon: '⚡',
          color: 'bg-indigo-500',
          lessons: [
            { title: 'Introduction to Physics', description: 'What physics studies and measurements', duration: '45 min', level: 'advanced' },
            { title: 'Force and Motion', description: 'Newton\'s laws and motion', duration: '50 min', level: 'advanced' },
            { title: 'Energy and Work', description: 'Forms of energy and energy transformations', duration: '45 min', level: 'advanced' }
          ]
        }
      ]
    },
    'secondary-2': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '∑',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Advanced Algebra', description: 'Quadratic equations and factorization', duration: '50 min', level: 'advanced' },
            { title: 'Trigonometry Basics', description: 'Sine, cosine, and tangent functions', duration: '45 min', level: 'advanced' },
            { title: 'Coordinate Geometry', description: 'Graphs and linear equations', duration: '45 min', level: 'advanced' },
            { title: 'Statistics and Probability', description: 'Advanced data analysis and probability', duration: '40 min', level: 'advanced' }
          ]
        },
        {
          name: 'Biology',
          icon: '🧬',
          color: 'bg-green-600',
          lessons: [
            { title: 'Photosynthesis and Respiration', description: 'Energy processes in plants', duration: '50 min', level: 'advanced' },
            { title: 'Human Physiology', description: 'Body systems and their functions', duration: '50 min', level: 'advanced' },
            { title: 'Genetics and Heredity', description: 'DNA, genes and inheritance', duration: '45 min', level: 'advanced' },
            { title: 'Evolution and Ecology', description: 'Natural selection and ecosystems', duration: '45 min', level: 'advanced' }
          ]
        },
        {
          name: 'Chemistry',
          icon: '⚛️',
          color: 'bg-yellow-600',
          lessons: [
            { title: 'Periodic Table', description: 'Elements and their properties', duration: '45 min', level: 'advanced' },
            { title: 'Chemical Bonding', description: 'Ionic, covalent and metallic bonds', duration: '50 min', level: 'advanced' },
            { title: 'Acids, Bases and Salts', description: 'pH scale and neutralization', duration: '45 min', level: 'advanced' },
            { title: 'Organic Chemistry Introduction', description: 'Carbon compounds and hydrocarbons', duration: '50 min', level: 'advanced' }
          ]
        },
        {
          name: 'Physics',
          icon: '⚡',
          color: 'bg-indigo-500',
          lessons: [
            { title: 'Waves and Sound', description: 'Properties of waves and sound', duration: '45 min', level: 'advanced' },
            { title: 'Electricity and Magnetism', description: 'Current, voltage, and magnetic fields', duration: '50 min', level: 'advanced' },
            { title: 'Heat and Temperature', description: 'Thermal energy and heat transfer', duration: '40 min', level: 'advanced' },
            { title: 'Light and Optics', description: 'Reflection, refraction, and lenses', duration: '45 min', level: 'advanced' }
          ]
        }
      ]
    },
    'secondary-3': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '∑',
          color: 'bg-blue-500',
          lessons: [
            { title: 'Advanced Trigonometry', description: 'Trigonometric identities and equations', duration: '50 min', level: 'expert' },
            { title: 'Calculus Introduction', description: 'Limits, derivatives and applications', duration: '55 min', level: 'expert' },
            { title: 'Matrices and Determinants', description: 'Matrix operations and solutions', duration: '50 min', level: 'expert' },
            { title: 'Complex Numbers', description: 'Imaginary numbers and operations', duration: '45 min', level: 'expert' }
          ]
        },
        {
          name: 'Biology',
          icon: '🧬',
          color: 'bg-green-600',
          lessons: [
            { title: 'Advanced Genetics', description: 'Molecular genetics and biotechnology', duration: '55 min', level: 'expert' },
            { title: 'Microbiology', description: 'Bacteria, viruses and microorganisms', duration: '50 min', level: 'expert' },
            { title: 'Plant Biology', description: 'Advanced plant structure and function', duration: '50 min', level: 'expert' }
          ]
        },
        {
          name: 'Chemistry',
          icon: '⚛️',
          color: 'bg-yellow-600',
          lessons: [
            { title: 'Advanced Organic Chemistry', description: 'Complex organic compounds', duration: '55 min', level: 'expert' },
            { title: 'Chemical Kinetics', description: 'Reaction rates and mechanisms', duration: '50 min', level: 'expert' },
            { title: 'Electrochemistry', description: 'Oxidation, reduction and batteries', duration: '50 min', level: 'expert' }
          ]
        },
        {
          name: 'Physics',
          icon: '⚡',
          color: 'bg-indigo-500',
          lessons: [
            { title: 'Advanced Mechanics', description: 'Rotational motion and momentum', duration: '55 min', level: 'expert' },
            { title: 'Quantum Physics Introduction', description: 'Atomic structure and quantum theory', duration: '50 min', level: 'expert' },
            { title: 'Nuclear Physics', description: 'Radioactivity and nuclear reactions', duration: '50 min', level: 'expert' }
          ]
        }
      ]
    },
    'secondary-4': {
      subjects: [
        {
          name: 'Mathematics',
          icon: '∑',
          color: 'bg-blue-500',
          lessons: [
            { title: 'KCSE Mathematics Review', description: 'Comprehensive exam preparation', duration: '60 min', level: 'expert' },
            { title: 'Advanced Calculus', description: 'Integration and differential equations', duration: '55 min', level: 'expert' },
            { title: 'Mathematical Modeling', description: 'Real-world problem solving', duration: '50 min', level: 'expert' },
            { title: 'Exam Techniques', description: 'Time management and strategies', duration: '45 min', level: 'expert' }
          ]
        },
        {
          name: 'Biology',
          icon: '🧬',
          color: 'bg-green-600',
          lessons: [
            { title: 'KCSE Biology Preparation', description: 'Comprehensive exam review', duration: '60 min', level: 'expert' },
            { title: 'Advanced Ecology', description: 'Ecosystem dynamics and conservation', duration: '55 min', level: 'expert' },
            { title: 'Human Health and Disease', description: 'Immune system and diseases', duration: '50 min', level: 'expert' }
          ]
        },
        {
          name: 'Chemistry',
          icon: '⚛️',
          color: 'bg-yellow-600',
          lessons: [
            { title: 'KCSE Chemistry Review', description: 'Complete exam preparation', duration: '60 min', level: 'expert' },
            { title: 'Industrial Chemistry', description: 'Chemical processes in industry', duration: '55 min', level: 'expert' },
            { title: 'Environmental Chemistry', description: 'Pollution and green chemistry', duration: '50 min', level: 'expert' }
          ]
        },
        {
          name: 'Physics',
          icon: '⚡',
          color: 'bg-indigo-500',
          lessons: [
            { title: 'KCSE Physics Preparation', description: 'Comprehensive exam review', duration: '60 min', level: 'expert' },
            { title: 'Modern Physics', description: 'Relativity and particle physics', duration: '55 min', level: 'expert' },
            { title: 'Applied Physics', description: 'Technology and engineering applications', duration: '50 min', level: 'expert' }
          ]
        }
      ]
    }
  }

  const currentContent = lessonDatabase[selectedGrade] || lessonDatabase['primary-1']
  
  const totalLessons = currentContent.subjects.reduce((acc, subject) => acc + subject.lessons.length, 0)
  const completedCount = Array.from(completedLessons).filter(id => id.startsWith(selectedGrade)).length
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
  
  const availableSubjects = ['all', ...new Set(currentContent.subjects.map(s => s.name))]
  const availableLevels = ['all', ...new Set(currentContent.subjects.flatMap(s => s.lessons.map(l => l.level)))]
  
  const getFilteredSubjects = () => {
    const subjects = currentContent.subjects
    
    if (selectedSubject === 'all' && selectedLevel === 'all') {
      return subjects
    }
    
    return subjects.filter(subject => {
      if (selectedSubject !== 'all' && subject.name !== selectedSubject) {
        return false
      }
      
      if (selectedLevel !== 'all') {
        const hasLevelLessons = subject.lessons.some(lesson => lesson.level === selectedLevel)
        if (!hasLevelLessons) return false
      }
      
      return true
    }).map(subject => ({
      ...subject,
      lessons: selectedLevel === 'all' 
        ? subject.lessons 
        : subject.lessons.filter(lesson => lesson.level === selectedLevel)
    }))
  }
  
  const filteredSubjects = getFilteredSubjects()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Interactive Lessons</h1>
          <p className="text-gray-600 mb-6">Select your grade level to see age-appropriate content</p>
          
          {/* Progress Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Learning Progress</h2>
              <span className="text-sm text-gray-600">{completedCount} of {totalLessons} lessons completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{progressPercentage}% complete</p>
          </div>
          
          {/* Controls Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level:</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  {gradeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  {availableSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Level:</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  {availableLevels.map((level) => (
                    <option key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {filteredSubjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No lessons found for the selected filters.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your subject or level filters.</p>
            </div>
          ) : (
            filteredSubjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center mr-4`}>
                      <span className="text-2xl">{subject.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{subject.name}</h2>
                      <p className="text-gray-600">{subject.lessons.length} lessons available</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {subject.lessons.filter(lesson => isLessonCompleted(lesson.title, subject.name)).length} completed
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subject.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = isLessonCompleted(lesson.title, subject.name)
                    return (
                      <div key={lessonIndex} className={`border-2 rounded-lg p-4 hover:shadow-md transition-all ${
                        isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-red-300'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                            {isCompleted && <span className="text-green-600 mr-2">✓</span>}
                            {lesson.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            lesson.level === 'beginner' ? 'bg-green-100 text-green-800' :
                            lesson.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            lesson.level === 'advanced' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {lesson.level}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">⏱️ {lesson.duration}</span>
                          <button 
                            onClick={() => startLesson(lesson, subject.name)}
                            className={`px-3 py-1 rounded text-sm transition-colors ${
                              isCompleted 
                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                          >
                            {isCompleted ? 'Review' : 'Start Lesson'}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Lesson Modal */}
        {selectedLesson && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedLesson.title}</h2>
                  <p className="text-gray-600">{selectedLesson.subject} • {selectedLesson.duration}</p>
                </div>
                <button
                  onClick={closeLessonModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {isLoadingLesson ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Creating your personalized lesson...</p>
                      <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
                    </div>
                  </div>
                ) : (
                  <div className="lesson-content">
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">📚</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">Ready to Learn!</h3>
                          <p className="text-gray-600 text-sm">Take your time and enjoy learning about {selectedLesson.title}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lesson-content-display bg-white border-2 border-gray-200 rounded-lg p-8 shadow-inner" style={{
                      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
                      fontFamily: 'Georgia, serif'
                    }}>
                      <div 
                        className="lesson-text text-gray-800 leading-relaxed text-base"
                        dangerouslySetInnerHTML={{ 
                          __html: formatLessonContent(lessonContent)
                        }}
                      />
                      
                      <div className="mt-6 pt-4 border-t border-gray-300">
                        <div className="flex items-center justify-center text-gray-500 text-sm">
                          <span>📖</span>
                          <span className="ml-2">End of Lesson</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="text-yellow-400 text-xl">💡</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            <strong>Learning Tip:</strong> Take breaks if you need them, and don't hesitate to re-read any section that seems challenging!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    🎓 Lesson for {gradeOptions.find(g => g.value === selectedGrade)?.label}
                  </div>
                  <div className="flex gap-3">
                    {!isLessonCompleted(selectedLesson.title, selectedLesson.subject) ? (
                      <button
                        onClick={() => markLessonComplete(selectedLesson.title, selectedLesson.subject)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      >
                        <span className="mr-2">✓</span>
                        Mark Complete
                      </button>
                    ) : (
                      <div className="bg-green-100 text-green-800 px-6 py-2 rounded-lg flex items-center">
                        <span className="mr-2">✅</span>
                        Completed!
                      </div>
                    )}
                    <button
                      onClick={closeLessonModal}
                      className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Close Lesson
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Dashboard Page
function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Learning Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you'd like to learn today
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lessons Card */}
          <Link 
            to="/lessons"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-200"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Lessons</h3>
            <p className="text-gray-600 mb-4">
              Access comprehensive lessons across Mathematics, English, Science, and more. 
              Designed for the Kenyan curriculum.
            </p>
            <div className="flex items-center text-blue-600 font-semibold">
              Start Learning
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* AI Tutor Card */}
          <Link 
            to="/ai-tutor"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-green-200"
          >
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Tutor</h3>
            <p className="text-gray-600 mb-4">
              Get personalized help from your AI tutor. Ask questions, get explanations, 
              and receive guidance tailored to your learning needs.
            </p>
            <div className="flex items-center text-green-600 font-semibold">
              Chat with AI Tutor
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* USSD Access Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">USSD Access</h3>
            <p className="text-gray-600 mb-4">
              Access SomaNow even without internet! Dial *123# on your phone 
              to get lessons and AI help via USSD.
            </p>
            <div className="flex items-center text-yellow-600 font-semibold">
              Dial *123#
              <span className="ml-2">📞</span>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Progress</h3>
            <p className="text-gray-600 mb-4">
              Monitor your learning journey with detailed progress reports 
              and achievement badges.
            </p>
            <div className="flex items-center text-purple-600 font-semibold">
              Coming Soon
              <span className="ml-2">⏳</span>
            </div>
          </div>

          {/* Study Groups */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent">
            <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Study Groups</h3>
            <p className="text-gray-600 mb-4">
              Join study groups with other learners, share knowledge, 
              and learn together.
            </p>
            <div className="flex items-center text-indigo-600 font-semibold">
              Coming Soon
              <span className="ml-2">⏳</span>
            </div>
          </div>

          {/* Teacher Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🍎</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Teacher Resources</h3>
            <p className="text-gray-600 mb-4">
              Access teaching materials, lesson plans, and tools to enhance 
              classroom learning.
            </p>
            <div className="flex items-center text-red-600 font-semibold">
              Coming Soon
              <span className="ml-2">⏳</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Your Learning Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <div className="text-gray-600">AI Conversations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-600">Study Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">0</div>
              <div className="text-gray-600">Achievements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// AI Tutor Page
function AITutorPage() {
  const [messages, setMessages] = React.useState([
    {
      type: 'ai',
      content: "Hello! I'm your AI learning assistant powered by DeepSeek. I can help you with mathematics, science, English, Kiswahili, and other subjects aligned with the Kenyan curriculum. I provide step-by-step explanations suitable for your grade level and use examples relevant to Kenyan context. What would you like to learn today?"
    }
  ])
  const [inputMessage, setInputMessage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedGrade, setSelectedGrade] = React.useState('primary-4')
  const [selectedSubject, setSelectedSubject] = React.useState('general')

  const gradeOptions = [
    { value: 'primary-1', label: 'Primary 1' },
    { value: 'primary-2', label: 'Primary 2' },
    { value: 'primary-3', label: 'Primary 3' },
    { value: 'primary-4', label: 'Primary 4' },
    { value: 'primary-5', label: 'Primary 5' },
    { value: 'primary-6', label: 'Primary 6' },
    { value: 'primary-7', label: 'Primary 7' },
    { value: 'primary-8', label: 'Primary 8' },
    { value: 'secondary-1', label: 'Form 1' },
    { value: 'secondary-2', label: 'Form 2' },
    { value: 'secondary-3', label: 'Form 3' },
    { value: 'secondary-4', label: 'Form 4' }
  ]

  const subjectOptions = [
    { value: 'general', label: 'General Help' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English', label: 'English' },
    { value: 'Science', label: 'Science' },
    { value: 'Kiswahili', label: 'Kiswahili' },
    { value: 'Social Studies', label: 'Social Studies' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Geography', label: 'Geography' },
    { value: 'History', label: 'History' }
  ]

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = { type: 'user', content: inputMessage }
    setMessages(prev => [...prev, userMessage])
    
    setIsLoading(true)
    const currentMessage = inputMessage
    setInputMessage('')

    try {
      // Use our new AI client with context
      const aiResponse = await getAITutorResponse(currentMessage, {
        gradeLevel: selectedGrade,
        subject: selectedSubject,
        studentName: 'Student'
      })

      const aiMessage = { 
        type: 'ai', 
        content: aiResponse.message || aiResponse.error || "I'm sorry, I couldn't process your question right now.",
        source: aiResponse.source || 'unknown'
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorResponse = {
        type: 'ai',
        content: "I apologize, but I'm having trouble right now. Please try asking your question again.",
        source: 'error'
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Tutor - Powered by DeepSeek</h1>
        
        {/* Settings Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Level
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {gradeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Focus
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {subjectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md h-96 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-green-600">AI Tutor</span>
                        </div>
                        {message.source && (
                          <span className="text-xs text-gray-500">
                            {message.source === 'deepseek' ? '🤖 DeepSeek AI' : 
                             message.source === 'mock' ? '📚 Offline Mode' : ''}
                          </span>
                        )}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <span className="text-xs text-green-600">AI Tutor is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask me about ${selectedSubject === 'general' ? 'any subject' : selectedSubject} for ${gradeOptions.find(g => g.value === selectedGrade)?.label}...`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button 
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={!inputMessage.trim() || isLoading}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
            
            <div className="mt-2 text-sm text-gray-500">
              💡 Try asking: "Help me solve 2x + 5 = 15", "Explain photosynthesis", or "How do I write a good essay?"
            </div>
          </form>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">✨ AI Capabilities</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Step-by-step math solutions</li>
              <li>• Concept explanations</li>
              <li>• Language learning support</li>
              <li>• Study strategies</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🇰🇪 Local Context</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Kenyan curriculum aligned</li>
              <li>• English & Kiswahili support</li>
              <li>• Cultural context awareness</li>
              <li>• Exam preparation help</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Login Page
function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields!')
      return
    }

    // In a real app, this would authenticate with Supabase
    console.log('Login form submitted:', formData)
    
    // Simulate successful login and redirect to dashboard
    alert('Login successful! Welcome back to SomaNow!')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Welcome Back to SomaNow
          </h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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

// Sign Up Page
function SignUpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gradeLevel: '',
    phoneNumber: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!')
      return
    }

    // In a real app, this would call the Supabase signup API
    console.log('Signup form submitted:', formData)
    
    // Simulate successful signup and redirect to dashboard
    alert(`Welcome to SomaNow, ${formData.fullName}! Your account has been created successfully.`)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Join SomaNow Today
          </h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="+254 700 000 000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Grade Level</label>
              <select
                name="gradeLevel"
                value={formData.gradeLevel}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select Grade Level</option>
                <option value="primary-1">Primary 1</option>
                <option value="primary-2">Primary 2</option>
                <option value="primary-3">Primary 3</option>
                <option value="primary-4">Primary 4</option>
                <option value="primary-5">Primary 5</option>
                <option value="primary-6">Primary 6</option>
                <option value="primary-7">Primary 7</option>
                <option value="primary-8">Primary 8</option>
                <option value="secondary-1">Form 1</option>
                <option value="secondary-2">Form 2</option>
                <option value="secondary-3">Form 3</option>
                <option value="secondary-4">Form 4</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="Confirm your password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Create Account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-green-600 hover:text-green-700">
              Already have an account? Sign in
            </Link>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
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
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/ai-tutor" element={<AITutorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}
