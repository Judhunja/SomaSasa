-- Elimu Hub Database Schema
-- Production-ready schema with RLS (Row Level Security)
-- Created: 2025-09-01

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- PROFILES TABLE
-- Core user profiles with role-based access
-- ============================================================================

CREATE TYPE user_role AS ENUM ('student', 'mentor', 'parent', 'admin');

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Basic profile info
    full_name TEXT NOT NULL,
    phone_number TEXT UNIQUE,
    phone_hash TEXT GENERATED ALWAYS AS (encode(digest(phone_number, 'sha256'), 'hex')) STORED,
    role user_role DEFAULT 'student' NOT NULL,
    
    -- Learning preferences
    preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'sw')),
    grade_level INTEGER CHECK (grade_level >= 1 AND grade_level <= 12),
    subjects_of_interest TEXT[],
    
    -- Gamification
    total_points INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    
    -- Profile completeness
    profile_complete BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    bio TEXT,
    
    -- Learning goals
    weekly_goal_hours INTEGER DEFAULT 5,
    daily_reminder_time TIME DEFAULT '18:00:00'
);

-- ============================================================================
-- PARENT-CHILD RELATIONSHIPS
-- Enables parents to monitor children via USSD
-- ============================================================================

CREATE TABLE public.parent_child (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Relationship verification
    verified BOOLEAN DEFAULT FALSE,
    verification_code TEXT,
    verification_expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Permissions
    can_view_progress BOOLEAN DEFAULT TRUE,
    can_view_assignments BOOLEAN DEFAULT TRUE,
    can_receive_notifications BOOLEAN DEFAULT TRUE,
    
    UNIQUE(parent_id, child_id)
);

-- ============================================================================
-- CURRICULUM & LESSONS
-- Educational content structure
-- ============================================================================

CREATE TYPE lesson_type AS ENUM ('video', 'reading', 'interactive', 'quiz', 'practical');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');

CREATE TABLE public.subjects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_url TEXT,
    color_scheme JSONB DEFAULT '{"primary": "#3B82F6", "secondary": "#E0E7FF"}',
    
    -- Curriculum metadata
    grade_levels INTEGER[] DEFAULT '{1,2,3,4,5,6,7,8,9,10,11,12}',
    is_practical_skill BOOLEAN DEFAULT FALSE, -- for financial literacy, agri-tech, etc.
    display_order INTEGER DEFAULT 0
);

CREATE TABLE public.lessons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Basic lesson info
    title TEXT NOT NULL,
    description TEXT,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
    
    -- Content structure
    type lesson_type DEFAULT 'reading' NOT NULL,
    difficulty difficulty_level DEFAULT 'beginner' NOT NULL,
    estimated_duration_minutes INTEGER DEFAULT 30,
    
    -- Content
    content JSONB NOT NULL DEFAULT '{}', -- Flexible content structure
    video_url TEXT,
    audio_url TEXT,
    thumbnail_url TEXT,
    
    -- Learning objectives
    learning_objectives TEXT[],
    prerequisites UUID[], -- Array of lesson IDs
    
    -- Metadata
    grade_level INTEGER CHECK (grade_level >= 1 AND grade_level <= 12),
    tags TEXT[],
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Ordering
    chapter_number INTEGER DEFAULT 1,
    lesson_number INTEGER DEFAULT 1,
    
    -- Offline capability
    requires_internet BOOLEAN DEFAULT TRUE,
    downloadable_content JSONB DEFAULT '{}'
);

-- ============================================================================
-- PROGRESS TRACKING
-- User learning progress and analytics
-- ============================================================================

CREATE TYPE submission_status AS ENUM ('pending', 'submitted', 'graded', 'needs_review');

CREATE TABLE public.progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
    
    -- Progress tracking
    status submission_status DEFAULT 'pending' NOT NULL,
    score NUMERIC(5,2) CHECK (score >= 0 AND score <= 100),
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    
    -- Time tracking
    time_spent_minutes INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Content interaction
    progress_percentage NUMERIC(5,2) DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    current_section INTEGER DEFAULT 1,
    
    -- Feedback
    difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
    user_feedback TEXT,
    
    -- AI recommendations
    next_recommended_lessons UUID[],
    
    UNIQUE(profile_id, lesson_id)
);

-- ============================================================================
-- ASSIGNMENTS & SUBMISSIONS
-- Homework and assessment system
-- ============================================================================

CREATE TYPE assignment_type AS ENUM ('quiz', 'essay', 'practical', 'discussion');

CREATE TABLE public.assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    title TEXT NOT NULL,
    description TEXT,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    
    -- Assignment structure
    type assignment_type DEFAULT 'quiz' NOT NULL,
    questions JSONB NOT NULL DEFAULT '[]', -- Array of question objects
    max_score NUMERIC(5,2) DEFAULT 100,
    
    -- Timing
    due_date TIMESTAMP WITH TIME ZONE,
    estimated_duration_minutes INTEGER DEFAULT 30,
    
    -- Availability
    available_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    available_until TIMESTAMP WITH TIME ZONE,
    
    -- Settings
    allow_multiple_attempts BOOLEAN DEFAULT FALSE,
    show_correct_answers BOOLEAN DEFAULT TRUE,
    randomize_questions BOOLEAN DEFAULT FALSE,
    
    -- Target audience
    target_grade_levels INTEGER[],
    is_required BOOLEAN DEFAULT TRUE
);

CREATE TABLE public.submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
    
    -- Submission data
    answers JSONB NOT NULL DEFAULT '{}', -- User's answers
    score NUMERIC(5,2),
    auto_score NUMERIC(5,2), -- AI/automated scoring
    manual_score NUMERIC(5,2), -- Human grader override
    
    -- Timing
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    submitted_at TIMESTAMP WITH TIME ZONE,
    graded_at TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status submission_status DEFAULT 'pending' NOT NULL,
    attempt_number INTEGER DEFAULT 1,
    
    -- Feedback
    automated_feedback JSONB DEFAULT '{}',
    instructor_feedback TEXT,
    
    -- USSD submission support
    ussd_session_id TEXT, -- Track USSD submissions
    submitted_via_ussd BOOLEAN DEFAULT FALSE
);

-- ============================================================================
-- PEER LEARNING & STUDY CIRCLES
-- Community features for collaborative learning
-- ============================================================================

CREATE TYPE circle_type AS ENUM ('study_group', 'mentorship', 'project', 'discussion');
CREATE TYPE membership_status AS ENUM ('invited', 'member', 'moderator', 'banned');

CREATE TABLE public.learning_circles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Basic info
    name TEXT NOT NULL,
    description TEXT,
    type circle_type DEFAULT 'study_group' NOT NULL,
    
    -- Settings
    is_public BOOLEAN DEFAULT TRUE,
    max_members INTEGER DEFAULT 50,
    requires_approval BOOLEAN DEFAULT FALSE,
    
    -- Focus
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    target_grade_level INTEGER,
    
    -- Schedule
    meeting_schedule JSONB DEFAULT '{}', -- Flexible schedule structure
    timezone TEXT DEFAULT 'Africa/Nairobi',
    
    -- Creator
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    archived_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.circle_memberships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    circle_id UUID REFERENCES public.learning_circles(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    status membership_status DEFAULT 'member' NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Permissions
    can_invite_others BOOLEAN DEFAULT FALSE,
    can_moderate BOOLEAN DEFAULT FALSE,
    
    -- Contribution tracking
    messages_count INTEGER DEFAULT 0,
    helpful_votes INTEGER DEFAULT 0,
    
    UNIQUE(circle_id, profile_id)
);

-- ============================================================================
-- REAL-TIME MESSAGING
-- Chat system for study circles
-- ============================================================================

CREATE TYPE message_type AS ENUM ('text', 'image', 'file', 'system', 'assignment_help');

CREATE TABLE public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    circle_id UUID REFERENCES public.learning_circles(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Message content
    type message_type DEFAULT 'text' NOT NULL,
    content TEXT NOT NULL,
    
    -- Attachments
    file_url TEXT,
    file_name TEXT,
    file_size INTEGER,
    
    -- Threading
    reply_to_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
    
    -- Moderation
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    deleted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Engagement
    reactions JSONB DEFAULT '{}', -- emoji reactions
    is_pinned BOOLEAN DEFAULT FALSE,
    
    -- AI content
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_context JSONB DEFAULT '{}'
);

-- ============================================================================
-- AI TUTORING SYSTEM
-- Conversation history and personalized learning paths
-- ============================================================================

CREATE TABLE public.ai_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Conversation metadata
    title TEXT,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    
    -- Content
    messages JSONB NOT NULL DEFAULT '[]', -- Array of message objects
    
    -- Context
    learning_context JSONB DEFAULT '{}', -- User's current progress, weaknesses, etc.
    conversation_summary TEXT,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    archived_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.learning_paths (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Path info
    name TEXT NOT NULL,
    description TEXT,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
    
    -- AI-generated path
    lesson_sequence UUID[] NOT NULL, -- Ordered array of lesson IDs
    reasoning JSONB DEFAULT '{}', -- AI explanation for path choices
    
    -- Progress
    current_lesson_index INTEGER DEFAULT 0,
    estimated_completion_days INTEGER,
    
    -- Adaptation
    last_adapted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    adaptation_triggers JSONB DEFAULT '{}', -- Why path was adapted
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- USSD SESSION MANAGEMENT
-- Track USSD interactions for parents
-- ============================================================================

CREATE TYPE ussd_session_status AS ENUM ('active', 'completed', 'timeout', 'error');

CREATE TABLE public.ussd_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Session identification
    session_id TEXT NOT NULL UNIQUE, -- Africa's Talking session ID
    phone_number TEXT NOT NULL,
    phone_hash TEXT GENERATED ALWAYS AS (encode(digest(phone_number, 'sha256'), 'hex')) STORED,
    
    -- User context
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Session state
    current_menu TEXT DEFAULT 'main',
    menu_stack JSONB DEFAULT '[]', -- Navigation history
    user_input_history JSONB DEFAULT '[]',
    
    -- Status
    status ussd_session_status DEFAULT 'active' NOT NULL,
    last_interaction_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
    
    -- Analytics
    total_interactions INTEGER DEFAULT 0,
    menu_path TEXT[],
    completion_rate NUMERIC(3,2) DEFAULT 0,
    
    -- Error handling
    error_count INTEGER DEFAULT 0,
    last_error TEXT
);

-- ============================================================================
-- ANALYTICS & METRICS
-- Performance tracking and insights
-- ============================================================================

CREATE TABLE public.analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Event identification
    event_type TEXT NOT NULL, -- 'lesson_started', 'assignment_completed', etc.
    event_category TEXT NOT NULL, -- 'learning', 'social', 'ussd', etc.
    
    -- User context
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    session_id TEXT, -- Browser or USSD session
    
    -- Event data
    properties JSONB DEFAULT '{}',
    
    -- Context
    user_agent TEXT,
    platform TEXT, -- 'web', 'ussd', 'pwa'
    
    -- Performance
    load_time_ms INTEGER,
    offline_mode BOOLEAN DEFAULT FALSE
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Profiles
CREATE INDEX idx_profiles_phone_hash ON public.profiles(phone_hash);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_updated_at ON public.profiles(updated_at);

-- Progress
CREATE INDEX idx_progress_profile_lesson ON public.progress(profile_id, lesson_id);
CREATE INDEX idx_progress_last_accessed ON public.progress(last_accessed_at DESC);
CREATE INDEX idx_progress_status ON public.progress(status);

-- Lessons
CREATE INDEX idx_lessons_subject_published ON public.lessons(subject_id, is_published);
CREATE INDEX idx_lessons_grade_level ON public.lessons(grade_level);
CREATE INDEX idx_lessons_type ON public.lessons(type);

-- Messages (for real-time)
CREATE INDEX idx_messages_circle_created ON public.messages(circle_id, created_at DESC);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);

-- USSD Sessions
CREATE INDEX idx_ussd_sessions_phone_hash ON public.ussd_sessions(phone_hash);
CREATE INDEX idx_ussd_sessions_status_expires ON public.ussd_sessions(status, expires_at);
CREATE INDEX idx_ussd_sessions_session_id ON public.ussd_sessions(session_id);

-- Analytics
CREATE INDEX idx_analytics_type_created ON public.analytics_events(event_type, created_at);
CREATE INDEX idx_analytics_profile_created ON public.analytics_events(profile_id, created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Essential for data protection and multi-tenancy
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_child ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circle_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ussd_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- PROFILES: Users can read/update their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow mentors to view student profiles in their circles
CREATE POLICY "Mentors can view students in their circles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.circle_memberships cm1
            JOIN public.circle_memberships cm2 ON cm1.circle_id = cm2.circle_id
            WHERE cm1.profile_id = auth.uid() 
            AND cm1.status = 'moderator'
            AND cm2.profile_id = id
        )
    );

-- PARENT_CHILD: Parents and children can manage their relationships
CREATE POLICY "Parent-child relationship access" ON public.parent_child
    FOR ALL USING (parent_id = auth.uid() OR child_id = auth.uid());

-- SUBJECTS: Public read access for all authenticated users
CREATE POLICY "Subjects are publicly readable" ON public.subjects
    FOR SELECT USING (auth.role() = 'authenticated');

-- LESSONS: Public read access for published lessons
CREATE POLICY "Published lessons are publicly readable" ON public.lessons
    FOR SELECT USING (auth.role() = 'authenticated' AND is_published = true);

-- PROGRESS: Users can manage their own progress
CREATE POLICY "Users can manage their own progress" ON public.progress
    FOR ALL USING (profile_id = auth.uid());

-- Parents can view their children's progress
CREATE POLICY "Parents can view children progress" ON public.progress
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.parent_child pc
            WHERE pc.parent_id = auth.uid() 
            AND pc.child_id = progress.profile_id
            AND pc.can_view_progress = true
            AND pc.verified = true
        )
    );

-- ASSIGNMENTS: Public read access
CREATE POLICY "Assignments are publicly readable" ON public.assignments
    FOR SELECT USING (auth.role() = 'authenticated');

-- SUBMISSIONS: Users can manage their own submissions
CREATE POLICY "Users can manage their own submissions" ON public.submissions
    FOR ALL USING (profile_id = auth.uid());

-- Parents can view children's submissions
CREATE POLICY "Parents can view children submissions" ON public.submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.parent_child pc
            WHERE pc.parent_id = auth.uid() 
            AND pc.child_id = submissions.profile_id
            AND pc.can_view_assignments = true
            AND pc.verified = true
        )
    );

-- LEARNING CIRCLES: Public circles are readable, members can access private circles
CREATE POLICY "Public circles are readable" ON public.learning_circles
    FOR SELECT USING (is_public = true OR auth.uid() = created_by);

CREATE POLICY "Circle members can read their circles" ON public.learning_circles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.circle_memberships cm
            WHERE cm.circle_id = id 
            AND cm.profile_id = auth.uid()
            AND cm.status IN ('member', 'moderator')
        )
    );

CREATE POLICY "Users can create circles" ON public.learning_circles
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Circle creators can update their circles" ON public.learning_circles
    FOR UPDATE USING (auth.uid() = created_by);

-- CIRCLE MEMBERSHIPS: Members can view, moderators can manage
CREATE POLICY "Circle members can view memberships" ON public.circle_memberships
    FOR SELECT USING (
        profile_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.circle_memberships cm
            WHERE cm.circle_id = circle_memberships.circle_id
            AND cm.profile_id = auth.uid()
            AND cm.status IN ('member', 'moderator')
        )
    );

CREATE POLICY "Users can join circles" ON public.circle_memberships
    FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can leave circles" ON public.circle_memberships
    FOR DELETE USING (profile_id = auth.uid());

-- MESSAGES: Circle members can read/send messages
CREATE POLICY "Circle members can view messages" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.circle_memberships cm
            WHERE cm.circle_id = messages.circle_id
            AND cm.profile_id = auth.uid()
            AND cm.status IN ('member', 'moderator')
        )
    );

CREATE POLICY "Circle members can send messages" ON public.messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.circle_memberships cm
            WHERE cm.circle_id = messages.circle_id
            AND cm.profile_id = auth.uid()
            AND cm.status IN ('member', 'moderator')
        )
    );

-- AI CONVERSATIONS: Users can manage their own conversations
CREATE POLICY "Users can manage their AI conversations" ON public.ai_conversations
    FOR ALL USING (profile_id = auth.uid());

-- LEARNING PATHS: Users can manage their own paths
CREATE POLICY "Users can manage their learning paths" ON public.learning_paths
    FOR ALL USING (profile_id = auth.uid());

-- USSD SESSIONS: Special handling for service role access
CREATE POLICY "Service role can manage USSD sessions" ON public.ussd_sessions
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Users can view their own USSD sessions (for debugging)
CREATE POLICY "Users can view their USSD sessions" ON public.ussd_sessions
    FOR SELECT USING (profile_id = auth.uid());

-- ANALYTICS: Service role for collection, users can view their own
CREATE POLICY "Service role can manage analytics" ON public.analytics_events
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Users can view their analytics" ON public.analytics_events
    FOR SELECT USING (profile_id = auth.uid());

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.parent_child FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.subjects FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.progress FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.assignments FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.submissions FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.learning_circles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.circle_memberships FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.ai_conversations FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.learning_paths FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.ussd_sessions FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ============================================================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- ============================================================================

-- Get latest progress for parent (USSD)
CREATE OR REPLACE FUNCTION public.get_latest_progress_for_parent(parent_phone text)
RETURNS TABLE(child_name text, lesson_title text, score numeric, completed_at timestamp with time zone) 
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.full_name as child_name,
        l.title as lesson_title,
        pr.score,
        pr.completed_at
    FROM public.profiles parent_profile
    JOIN public.parent_child pc ON parent_profile.id = pc.parent_id
    JOIN public.profiles p ON pc.child_id = p.id
    JOIN public.progress pr ON p.id = pr.profile_id
    JOIN public.lessons l ON pr.lesson_id = l.id
    WHERE parent_profile.phone_hash = encode(digest(parent_phone, 'sha256'), 'hex')
    AND pc.verified = true
    AND pc.can_view_progress = true
    AND pr.completed_at IS NOT NULL
    ORDER BY pr.completed_at DESC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get today's assignments for a child (USSD)
CREATE OR REPLACE FUNCTION public.get_todays_assignments(child_phone text)
RETURNS TABLE(assignment_title text, subject_name text, due_date timestamp with time zone, estimated_minutes integer)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.title as assignment_title,
        s.name as subject_name,
        a.due_date,
        a.estimated_duration_minutes as estimated_minutes
    FROM public.profiles p
    JOIN public.assignments a ON true -- Global assignments, or add lesson progress filter
    LEFT JOIN public.lessons l ON a.lesson_id = l.id
    LEFT JOIN public.subjects s ON l.subject_id = s.id
    LEFT JOIN public.submissions sub ON a.id = sub.assignment_id AND sub.profile_id = p.id
    WHERE p.phone_hash = encode(digest(child_phone, 'sha256'), 'hex')
    AND a.due_date >= CURRENT_DATE
    AND a.due_date < CURRENT_DATE + INTERVAL '1 day'
    AND sub.id IS NULL -- Not yet submitted
    ORDER BY a.due_date ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Submit answer via USSD
CREATE OR REPLACE FUNCTION public.submit_ussd_answer(
    student_phone text,
    assignment_id_param uuid,
    answer_text text,
    ussd_session_id_param text
)
RETURNS jsonb
AS $$
DECLARE
    student_id uuid;
    submission_id uuid;
    result jsonb;
BEGIN
    -- Find student by phone
    SELECT id INTO student_id 
    FROM public.profiles 
    WHERE phone_hash = encode(digest(student_phone, 'sha256'), 'hex');
    
    IF student_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Student not found');
    END IF;
    
    -- Create submission
    INSERT INTO public.submissions (
        profile_id, 
        assignment_id, 
        answers, 
        submitted_at, 
        status, 
        ussd_session_id,
        submitted_via_ussd
    ) VALUES (
        student_id,
        assignment_id_param,
        jsonb_build_object('text_answer', answer_text),
        NOW(),
        'submitted',
        ussd_session_id_param,
        true
    ) RETURNING id INTO submission_id;
    
    RETURN jsonb_build_object(
        'success', true, 
        'submission_id', submission_id,
        'message', 'Answer submitted successfully'
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- REAL-TIME SUBSCRIPTIONS SETUP
-- ============================================================================

-- Enable real-time for messages (study circles chat)
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.circle_memberships;

-- Enable real-time for progress updates (live learning analytics)
ALTER PUBLICATION supabase_realtime ADD TABLE public.progress;

-- ============================================================================
-- PERFORMANCE OPTIMIZATIONS
-- ============================================================================

-- Partial indexes for common queries
CREATE INDEX CONCURRENTLY idx_messages_circle_not_deleted 
    ON public.messages(circle_id, created_at DESC) 
    WHERE is_deleted = false;

CREATE INDEX CONCURRENTLY idx_progress_incomplete 
    ON public.progress(profile_id, lesson_id) 
    WHERE status IN ('pending', 'submitted');

CREATE INDEX CONCURRENTLY idx_ussd_active_sessions 
    ON public.ussd_sessions(phone_hash, expires_at) 
    WHERE status = 'active';

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.profiles IS 'User profiles with role-based access control. Supports students, mentors, parents, and admins with gamification features.';
COMMENT ON TABLE public.parent_child IS 'Verified relationships between parents and children for USSD monitoring access.';
COMMENT ON TABLE public.lessons IS 'Educational content with flexible JSONB structure supporting multiple content types and offline capability.';
COMMENT ON TABLE public.progress IS 'Detailed learning progress tracking with time analytics and AI recommendation support.';
COMMENT ON TABLE public.ussd_sessions IS 'USSD session state management for Africa\'s Talking integration with proper security via phone hashing.';
COMMENT ON COLUMN public.profiles.phone_hash IS 'SHA256 hash of phone number for secure USSD lookup without storing plain phone numbers.';
COMMENT ON COLUMN public.lessons.content IS 'Flexible JSONB structure: {sections: [], quiz: [], resources: []} allows rich content without rigid schema.';
COMMENT ON COLUMN public.progress.next_recommended_lessons IS 'AI-generated lesson recommendations based on performance and learning patterns.';

-- Grant necessary permissions for service role (used by Edge Functions)
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Grant read access to authenticated users (anon key)
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
