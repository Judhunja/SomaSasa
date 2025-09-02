-- Elimu Hub Seed Data
-- Production-ready sample data for development and testing
-- Created: 2025-09-01

-- ============================================================================
-- SUBJECTS DATA
-- Kenya-focused curriculum with practical skills
-- ============================================================================

INSERT INTO public.subjects (id, name, description, icon_url, color_scheme, grade_levels, is_practical_skill, display_order) VALUES
-- Academic Subjects
('550e8400-e29b-41d4-a716-446655440001', 'Mathematics', 'Core mathematics from basic arithmetic to advanced topics', '/icons/math.svg', '{"primary": "#3B82F6", "secondary": "#E0E7FF"}', '{1,2,3,4,5,6,7,8,9,10,11,12}', false, 1),
('550e8400-e29b-41d4-a716-446655440002', 'English Language', 'English reading, writing, grammar, and communication skills', '/icons/english.svg', '{"primary": "#059669", "secondary": "#D1FAE5"}', '{1,2,3,4,5,6,7,8,9,10,11,12}', false, 2),
('550e8400-e29b-41d4-a716-446655440003', 'Kiswahili', 'Lugha ya Kiswahili - mazungumzo, maandishi, na utamaduni', '/icons/kiswahili.svg', '{"primary": "#DC2626", "secondary": "#FEE2E2"}', '{1,2,3,4,5,6,7,8,9,10,11,12}', false, 3),
('550e8400-e29b-41d4-a716-446655440004', 'Science & Nature', 'General science, biology, chemistry, and physics', '/icons/science.svg', '{"primary": "#7C3AED", "secondary": "#EDE9FE"}', '{1,2,3,4,5,6,7,8,9,10,11,12}', false, 4),
('550e8400-e29b-41d4-a716-446655440005', 'Social Studies', 'Geography, history, civics, and cultural studies', '/icons/social.svg', '{"primary": "#EA580C", "secondary": "#FED7AA"}', '{1,2,3,4,5,6,7,8,9,10,11,12}', false, 5),

-- Practical Skills (Kenya-focused)
('550e8400-e29b-41d4-a716-446655440006', 'Financial Literacy', 'Money management, budgeting, savings, and basic economics', '/icons/finance.svg', '{"primary": "#16A34A", "secondary": "#DCFCE7"}', '{6,7,8,9,10,11,12}', true, 10),
('550e8400-e29b-41d4-a716-446655440007', 'Digital Skills', 'Computer literacy, internet safety, and basic tech skills', '/icons/digital.svg', '{"primary": "#0EA5E9", "secondary": "#E0F2FE"}', '{4,5,6,7,8,9,10,11,12}', true, 11),
('550e8400-e29b-41d4-a716-446655440008', 'Entrepreneurship', 'Business basics, leadership, and innovation skills', '/icons/business.svg', '{"primary": "#F59E0B", "secondary": "#FEF3C7"}', '{8,9,10,11,12}', true, 12),
('550e8400-e29b-41d4-a716-446655440009', 'Agriculture & Environment', 'Sustainable farming, climate awareness, and environmental conservation', '/icons/agriculture.svg', '{"primary": "#65A30D", "secondary": "#ECFCCB"}', '{6,7,8,9,10,11,12}', true, 13),
('550e8400-e29b-41d4-a716-446655440010', 'Health & Life Skills', 'Personal health, nutrition, and essential life skills', '/icons/health.svg', '{"primary": "#EC4899", "secondary": "#FCE7F3"}', '{3,4,5,6,7,8,9,10,11,12}', true, 14);

-- ============================================================================
-- LESSONS DATA
-- Sample lessons with rich content structure
-- ============================================================================

-- Mathematics Lessons
INSERT INTO public.lessons (id, title, description, subject_id, type, difficulty, estimated_duration_minutes, content, learning_objectives, grade_level, tags, is_published, published_at, chapter_number, lesson_number) VALUES
('550e8400-e29b-41d4-a716-446655441001', 'Introduction to Numbers', 'Learn about counting, number recognition, and basic number concepts', '550e8400-e29b-41d4-a716-446655440001', 'interactive', 'beginner', 25, 
'{"sections": [{"title": "What are Numbers?", "content": "Numbers help us count and measure things around us.", "examples": ["1 apple", "2 birds", "3 books"]}, {"title": "Counting Practice", "content": "Let''s practice counting from 1 to 10", "interactive": true, "activity": "counting_game"}], "quiz": [{"question": "How many fingers do you have?", "options": ["8", "10", "12"], "correct": 1}]}', 
'{"Learn to count from 1 to 10", "Recognize numbers in daily life", "Understand the concept of quantity"}', 1, '{"counting", "basic math", "numbers"}', true, NOW(), 1, 1),

('550e8400-e29b-41d4-a716-446655441002', 'Basic Addition', 'Learn to add small numbers using objects and visual aids', '550e8400-e29b-41d4-a716-446655440001', 'interactive', 'beginner', 30,
'{"sections": [{"title": "What is Addition?", "content": "Addition means putting things together to find the total."}, {"title": "Adding with Objects", "content": "Use stones, sticks, or fingers to add numbers."}, {"title": "Addition Practice", "activity": "addition_game", "examples": ["2 + 3 = 5", "1 + 4 = 5"]}], "quiz": [{"question": "What is 3 + 2?", "options": ["4", "5", "6"], "correct": 1}]}',
'{"Understand the concept of addition", "Add numbers up to 10", "Use objects to solve addition problems"}', 1, '{"addition", "basic math", "problem solving"}', true, NOW(), 1, 2),

-- English Lessons
('550e8400-e29b-41d4-a716-446655441003', 'The Alphabet Song', 'Learn the English alphabet through songs and visual recognition', '550e8400-e29b-41d4-a716-446655440002', 'video', 'beginner', 20,
'{"sections": [{"title": "ABC Song", "content": "Sing along to learn all 26 letters", "video_url": "/videos/abc-song.mp4"}, {"title": "Letter Recognition", "content": "Can you find these letters?", "interactive": true, "activity": "letter_hunt"}], "resources": [{"type": "worksheet", "title": "Alphabet Tracing", "url": "/worksheets/alphabet-tracing.pdf"}]}',
'{"Recognize all 26 letters", "Sing the alphabet song", "Identify letters in words"}', 1, '{"alphabet", "letters", "reading basics"}', true, NOW(), 1, 1),

-- Kiswahili Lessons
('550e8400-e29b-41d4-a716-446655441004', 'Salamu za Kiswahili', 'Jifunze jinsi ya kusalimu kwa Kiswahili', '550e8400-e29b-41d4-a716-446655440003', 'interactive', 'beginner', 25,
'{"sections": [{"title": "Salamu za Asubuhi", "content": "Habari za asubuhi - Good morning greetings"}, {"title": "Salamu za Jioni", "content": "Habari za jioni - Evening greetings"}, {"title": "Mazoezi", "activity": "greeting_practice", "examples": ["Hujambo - Hello", "Asante - Thank you"]}]}',
'{"Jifunze salamu za Kiswahili", "Tumia maneno ya heshima", "Ongea na wenzako kwa lugha ya Kiswahili"}', 1, '{"salamu", "mazungumzo", "utamaduni"}', true, NOW(), 1, 1),

-- Financial Literacy Lessons
('550e8400-e29b-41d4-a716-446655441005', 'Understanding Money', 'Learn about Kenyan currency and basic money concepts', '550e8400-e29b-41d4-a716-446655440006', 'interactive', 'beginner', 35,
'{"sections": [{"title": "Kenyan Shillings", "content": "Our money is called Kenyan Shillings (KES)", "examples": ["1 Shilling coin", "5 Shilling coin", "10 Shilling coin", "20 Shilling note"]}, {"title": "Counting Money", "content": "Let''s learn to count our money", "activity": "money_counting"}, {"title": "Making Change", "content": "How do we get change when shopping?", "examples": ["Buy item for 15 KES with 20 KES note"]}]}',
'{"Recognize Kenyan currency", "Count money accurately", "Understand the concept of change"}', 6, '{"money", "currency", "Kenya", "practical skills"}', true, NOW(), 1, 1),

-- Digital Skills Lessons
('550e8400-e29b-41d4-a716-446655441006', 'Using a Computer Safely', 'Basic computer skills and internet safety for beginners', '550e8400-e29b-41d4-a716-446655440007', 'video', 'beginner', 40,
'{"sections": [{"title": "Parts of a Computer", "content": "Monitor, keyboard, mouse, and CPU", "video_url": "/videos/computer-parts.mp4"}, {"title": "Internet Safety", "content": "How to stay safe online", "tips": ["Never share personal information", "Tell an adult about strange messages", "Use strong passwords"]}, {"title": "Hands-on Practice", "activity": "computer_simulation"}]}',
'{"Identify computer parts", "Practice safe internet habits", "Use mouse and keyboard basics"}', 4, '{"computer", "safety", "technology", "digital literacy"}', true, NOW(), 1, 1),

-- Agriculture Lessons
('550e8400-e29b-41d4-a716-446655441007', 'Growing Vegetables at Home', 'Learn sustainable farming practices for small spaces', '550e8400-e29b-41d4-a716-446655440009', 'practical', 'beginner', 45,
'{"sections": [{"title": "Choosing Seeds", "content": "Select vegetables that grow well in Kenya", "examples": ["Sukuma wiki (Kale)", "Nyanya (Tomatoes)", "Karoti (Carrots)", "Mboga (Spinach)"]}, {"title": "Preparing Soil", "content": "Good soil helps plants grow strong"}, {"title": "Watering Plants", "content": "When and how much to water your vegetables"}, {"title": "Project", "activity": "garden_planning", "description": "Plan your own small vegetable garden"}]}',
'{"Select appropriate vegetables for home growing", "Prepare soil for planting", "Create a watering schedule", "Plan a small garden project"}', 6, '{"agriculture", "vegetables", "sustainability", "practical"}', true, NOW(), 1, 1);

-- ============================================================================
-- SAMPLE USER PROFILES
-- Test users for development (password: "password123")
-- ============================================================================

-- Note: In production, users would be created through Supabase Auth
-- These are sample profiles for development/testing

INSERT INTO public.profiles (id, full_name, phone_number, role, preferred_language, grade_level, subjects_of_interest, total_points, profile_complete, bio) VALUES
-- Students
('550e8400-e29b-41d4-a716-446655440100', 'Amina Wanjiku', '+254701234567', 'student', 'en', 8, '{"Mathematics", "Science & Nature", "Financial Literacy"}', 150, true, 'I love learning math and science. I want to become an engineer.'),
('550e8400-e29b-41d4-a716-446655440101', 'James Kiprotich', '+254701234568', 'student', 'sw', 6, '{"Kiswahili", "Social Studies", "Agriculture & Environment"}', 98, true, 'Ninapenda kilimo na mazingira. Nataka kuwa mkulima.'),
('550e8400-e29b-41d4-a716-446655440102', 'Grace Achieng', '+254701234569', 'student', 'en', 10, '{"English Language", "Digital Skills", "Entrepreneurship"}', 220, true, 'Passionate about technology and business. Future CEO!'),

-- Mentors
('550e8400-e29b-41d4-a716-446655440200', 'Dr. Mary Njeri', '+254701234570', 'mentor', 'en', NULL, '{"Mathematics", "Science & Nature"}', 450, true, 'Mathematics teacher with 10 years experience. Love helping students discover the joy of learning.'),
('550e8400-e29b-41d4-a716-446655440201', 'Mr. David Otieno', '+254701234571', 'mentor', 'sw', NULL, '{"Kiswahili", "Social Studies"}', 380, true, 'Mwalimu wa Kiswahili. Ninahakikisha wanafunzi wanapenda lugha yao.'),

-- Parents
('550e8400-e29b-41d4-a716-446655440300', 'Sarah Wanjiku', '+254701234572', 'parent', 'en', NULL, '{}', 25, true, 'Mother of Amina. Supportive of her daughter''s education journey.'),
('550e8400-e29b-41d4-a716-446655440301', 'Peter Kiprotich', '+254701234573', 'parent', 'sw', NULL, '{}', 15, true, 'Father of James. Farmer interested in modern agriculture techniques.');

-- ============================================================================
-- PARENT-CHILD RELATIONSHIPS
-- ============================================================================

INSERT INTO public.parent_child (parent_id, child_id, verified, can_view_progress, can_view_assignments, can_receive_notifications) VALUES
('550e8400-e29b-41d4-a716-446655440300', '550e8400-e29b-41d4-a716-446655440100', true, true, true, true),
('550e8400-e29b-41d4-a716-446655440301', '550e8400-e29b-41d4-a716-446655440101', true, true, true, true);

-- ============================================================================
-- LEARNING PROGRESS DATA
-- Sample progress for students
-- ============================================================================

INSERT INTO public.progress (profile_id, lesson_id, status, score, attempts, time_spent_minutes, started_at, completed_at, last_accessed_at, progress_percentage, difficulty_rating) VALUES
-- Amina's Progress
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655441001', 'graded', 85.5, 1, 22, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day', 100, 4),
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655441002', 'graded', 92.0, 1, 28, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', 100, 3),
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655441005', 'submitted', NULL, 1, 30, NOW() - INTERVAL '1 day', NULL, NOW() - INTERVAL '2 hours', 80, NULL),

-- James's Progress
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655441004', 'graded', 78.0, 1, 20, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', NOW() - INTERVAL '1 day', 100, 5),
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655441007', 'submitted', NULL, 1, 35, NOW() - INTERVAL '1 day', NULL, NOW() - INTERVAL '3 hours', 75, NULL),

-- Grace's Progress
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655441003', 'graded', 95.5, 1, 18, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '2 days', 100, 2),
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655441006', 'graded', 88.0, 1, 35, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day', 100, 3);

-- ============================================================================
-- SAMPLE ASSIGNMENTS
-- ============================================================================

INSERT INTO public.assignments (id, title, description, lesson_id, type, questions, max_score, due_date, estimated_duration_minutes, target_grade_levels, is_required) VALUES
('550e8400-e29b-41d4-a716-446655442001', 'Number Recognition Quiz', 'Test your knowledge of numbers 1-10', '550e8400-e29b-41d4-a716-446655441001', 'quiz', 
'[
  {"id": 1, "question": "Which number comes after 5?", "type": "multiple_choice", "options": ["4", "6", "7"], "correct": 1, "points": 10},
  {"id": 2, "question": "Count the dots: • • • •", "type": "multiple_choice", "options": ["3", "4", "5"], "correct": 1, "points": 10},
  {"id": 3, "question": "Write the number that represents three objects", "type": "text", "correct": "3", "points": 10}
]', 30, NOW() + INTERVAL '7 days', 15, '{1,2}', true),

('550e8400-e29b-41d4-a716-446655442002', 'Money Counting Exercise', 'Practice counting Kenyan shillings', '550e8400-e29b-41d4-a716-446655441005', 'practical',
'[
  {"id": 1, "question": "How much money is this: 10 KES + 5 KES + 1 KES?", "type": "multiple_choice", "options": ["15 KES", "16 KES", "17 KES"], "correct": 1, "points": 20},
  {"id": 2, "question": "If you buy an item for 25 KES and pay with 50 KES, how much change do you get?", "type": "text", "correct": "25", "points": 30}
]', 50, NOW() + INTERVAL '3 days', 20, '{6,7,8}', true);

-- ============================================================================
-- SAMPLE SUBMISSIONS
-- ============================================================================

INSERT INTO public.submissions (profile_id, assignment_id, answers, score, auto_score, started_at, submitted_at, graded_at, status, attempt_number) VALUES
-- Amina's submissions
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655442001', 
'{"1": 1, "2": 1, "3": "3"}', 30.0, 30.0, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', 'graded', 1),

-- James working on assignment
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655442002', 
'{"1": 1, "2": "25"}', NULL, NULL, NOW() - INTERVAL '1 hour', NULL, NULL, 'pending', 1);

-- ============================================================================
-- LEARNING CIRCLES
-- Sample study groups and mentorship circles
-- ============================================================================

INSERT INTO public.learning_circles (id, name, description, type, is_public, max_members, subject_id, target_grade_level, created_by) VALUES
('550e8400-e29b-41d4-a716-446655443001', 'Math Wizards Grade 8', 'Study group for Grade 8 mathematics students', 'study_group', true, 20, '550e8400-e29b-41d4-a716-446655440001', 8, '550e8400-e29b-41d4-a716-446655440200'),
('550e8400-e29b-41d4-a716-446655443002', 'Kiswahili Champions', 'Tusome Kiswahili pamoja - Let''s learn Swahili together', 'study_group', true, 15, '550e8400-e29b-41d4-a716-446655440003', 6, '550e8400-e29b-41d4-a716-446655440201'),
('550e8400-e29b-41d4-a716-446655443003', 'Young Entrepreneurs', 'Learn business skills and entrepreneurship', 'mentorship', true, 25, '550e8400-e29b-41d4-a716-446655440008', 10, '550e8400-e29b-41d4-a716-446655440200');

-- ============================================================================
-- CIRCLE MEMBERSHIPS
-- ============================================================================

INSERT INTO public.circle_memberships (circle_id, profile_id, status, can_invite_others, can_moderate, messages_count, helpful_votes) VALUES
-- Math Wizards memberships
('550e8400-e29b-41d4-a716-446655443001', '550e8400-e29b-41d4-a716-446655440200', 'moderator', true, true, 15, 8),
('550e8400-e29b-41d4-a716-446655443001', '550e8400-e29b-41d4-a716-446655440100', 'member', false, false, 12, 3),
('550e8400-e29b-41d4-a716-446655443001', '550e8400-e29b-41d4-a716-446655440102', 'member', false, false, 8, 5),

-- Kiswahili Champions memberships
('550e8400-e29b-41d4-a716-446655443002', '550e8400-e29b-41d4-a716-446655440201', 'moderator', true, true, 20, 12),
('550e8400-e29b-41d4-a716-446655443002', '550e8400-e29b-41d4-a716-446655440101', 'member', false, false, 5, 2),

-- Young Entrepreneurs memberships
('550e8400-e29b-41d4-a716-446655443003', '550e8400-e29b-41d4-a716-446655440200', 'moderator', true, true, 10, 6),
('550e8400-e29b-41d4-a716-446655443003', '550e8400-e29b-41d4-a716-446655440102', 'member', false, false, 7, 4);

-- ============================================================================
-- SAMPLE MESSAGES
-- Recent chat messages in study circles
-- ============================================================================

INSERT INTO public.messages (circle_id, sender_id, type, content, reactions) VALUES
('550e8400-e29b-41d4-a716-446655443001', '550e8400-e29b-41d4-a716-446655440200', 'text', 'Welcome to Math Wizards! Let''s help each other master mathematics 📊', '{"👍": 3, "🎉": 2}'),
('550e8400-e29b-41d4-a716-446655443001', '550e8400-e29b-41d4-a716-446655440100', 'text', 'Thank you Dr. Mary! I''m excited to learn fractions better', '{"❤️": 1}'),
('550e8400-e29b-41d4-a716-446655443001', '550e8400-e29b-41d4-a716-446655440102', 'text', 'Can someone help me understand the addition lesson? I''m stuck on the word problems', '{}'),

('550e8400-e29b-41d4-a716-446655443002', '550e8400-e29b-41d4-a716-446655440201', 'text', 'Habari za leo! Leo tutajifunza kuhusu mazungumzo ya kila siku', '{"👋": 2}'),
('550e8400-e29b-41d4-a716-446655443002', '550e8400-e29b-41d4-a716-446655440101', 'text', 'Habari nzuri mwalimu! Niko tayari kujifunza', '{"📚": 1}'),

('550e8400-e29b-41d4-a716-446655443003', '550e8400-e29b-41d4-a716-446655440200', 'text', 'Today we''ll discuss how to create a simple business plan. Who has a business idea to share?', '{"💡": 2}'),
('550e8400-e29b-41d4-a716-446655443003', '550e8400-e29b-41d4-a716-446655440102', 'text', 'I want to start a tech blog for young people in Kenya!', '{"🚀": 3, "👏": 1}');

-- ============================================================================
-- AI CONVERSATION SAMPLES
-- ============================================================================

INSERT INTO public.ai_conversations (profile_id, title, subject_id, lesson_id, messages, learning_context, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440100', 'Help with Addition', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655441002',
'[
  {"role": "user", "content": "I don''t understand how to add big numbers", "timestamp": "2025-09-01T10:00:00Z"},
  {"role": "ai", "content": "Let me help you! When adding big numbers, we can break them down into smaller parts. For example, 23 + 45 can be thought of as (20+40) + (3+5) = 60 + 8 = 68. Would you like to try an example?", "timestamp": "2025-09-01T10:00:15Z"},
  {"role": "user", "content": "Can you give me another example?", "timestamp": "2025-09-01T10:01:00Z"},
  {"role": "ai", "content": "Sure! Let''s try 34 + 27. First, add the tens: 30 + 20 = 50. Then add the ones: 4 + 7 = 11. Finally: 50 + 11 = 61. Try this method with 45 + 38!", "timestamp": "2025-09-01T10:01:20Z"}
]',
'{"current_topic": "addition", "difficulty_level": "beginner", "recent_scores": [85.5, 92.0], "learning_style": "visual"}', true),

('550e8400-e29b-41d4-a716-446655440102', 'Digital Safety Questions', '550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655441006',
'[
  {"role": "user", "content": "What should I do if someone online asks for my phone number?", "timestamp": "2025-09-01T14:30:00Z"},
  {"role": "ai", "content": "Great question! You should NEVER share your phone number, address, or other personal information online with strangers. If someone asks for this information, don''t respond and tell a trusted adult immediately. Your safety is most important!", "timestamp": "2025-09-01T14:30:10Z"},
  {"role": "user", "content": "What about my school name?", "timestamp": "2025-09-01T14:31:00Z"},
  {"role": "ai", "content": "Your school name is also personal information that you shouldn''t share online. Strangers could use this information to find you. Keep details about where you go to school, live, or spend time to yourself when chatting online.", "timestamp": "2025-09-01T14:31:15Z"}
]',
'{"current_topic": "internet_safety", "age_group": "teenager", "concerns": ["privacy", "online_strangers"]}', true);

-- ============================================================================
-- LEARNING PATHS
-- AI-generated personalized learning sequences
-- ============================================================================

INSERT INTO public.learning_paths (profile_id, name, description, subject_id, lesson_sequence, reasoning, current_lesson_index, estimated_completion_days) VALUES
('550e8400-e29b-41d4-a716-446655440100', 'Amina''s Math Journey', 'Personalized math path based on assessment results', '550e8400-e29b-41d4-a716-446655440001',
'{"550e8400-e29b-41d4-a716-446655441001", "550e8400-e29b-41d4-a716-446655441002"}',
'{"reasoning": "Student shows strong number recognition but needs practice with addition concepts", "adaptations": [], "strengths": ["number recognition", "counting"], "areas_for_improvement": ["word problems", "mental math"]}',
2, 14),

('550e8400-e29b-41d4-a716-446655440101', 'James'' Kiswahili Path', 'Focused on conversational Kiswahili and cultural understanding', '550e8400-e29b-41d4-a716-446655440003',
'{"550e8400-e29b-41d4-a716-446655441004"}',
'{"reasoning": "Student prefers learning in Kiswahili and shows interest in cultural topics", "focus_areas": ["conversation", "cultural_context"], "preferred_language": "sw"}',
1, 7);

-- ============================================================================
-- ANALYTICS EVENTS SAMPLE DATA
-- ============================================================================

INSERT INTO public.analytics_events (event_type, event_category, profile_id, properties, platform, offline_mode) VALUES
('lesson_started', 'learning', '550e8400-e29b-41d4-a716-446655440100', '{"lesson_id": "550e8400-e29b-41d4-a716-446655441001", "subject": "Mathematics", "grade_level": 8}', 'web', false),
('lesson_completed', 'learning', '550e8400-e29b-41d4-a716-446655440100', '{"lesson_id": "550e8400-e29b-41d4-a716-446655441001", "score": 85.5, "time_spent": 22, "attempts": 1}', 'web', false),
('assignment_submitted', 'learning', '550e8400-e29b-41d4-a716-446655440100', '{"assignment_id": "550e8400-e29b-41d4-a716-446655442001", "score": 30, "submission_method": "web"}', 'web', false),
('circle_joined', 'social', '550e8400-e29b-41d4-a716-446655440100', '{"circle_id": "550e8400-e29b-41d4-a716-446655443001", "circle_name": "Math Wizards Grade 8"}', 'web', false),
('ussd_session_started', 'ussd', '550e8400-e29b-41d4-a716-446655440300', '{"phone_hash": "hashed_phone", "menu_accessed": "main"}', 'ussd', false),
('ai_conversation_started', 'ai', '550e8400-e29b-41d4-a716-446655440100', '{"topic": "addition", "subject_id": "550e8400-e29b-41d4-a716-446655440001"}', 'web', false);

-- ============================================================================
-- UPDATE PROFILE POINTS BASED ON ACTIVITIES
-- ============================================================================

-- Update points based on completed lessons and activities
UPDATE public.profiles SET total_points = (
    SELECT COALESCE(SUM(
        CASE 
            WHEN p.status = 'graded' AND p.score >= 80 THEN 20
            WHEN p.status = 'graded' AND p.score >= 60 THEN 15
            WHEN p.status = 'graded' THEN 10
            ELSE 0
        END
    ), 0) + 
    COALESCE((SELECT COUNT(*) * 5 FROM public.circle_memberships cm WHERE cm.profile_id = profiles.id), 0) +
    COALESCE((SELECT COUNT(*) * 2 FROM public.messages m WHERE m.sender_id = profiles.id), 0)
    FROM public.progress p 
    WHERE p.profile_id = profiles.id
) WHERE role = 'student';

-- ============================================================================
-- REFRESH MATERIALIZED VIEWS (if any created later)
-- ============================================================================

-- This section would contain materialized view refreshes for analytics
-- Currently not needed as we use regular tables

-- ============================================================================
-- VERIFY DATA INTEGRITY
-- ============================================================================

-- Ensure all foreign key relationships are valid
DO $$ 
BEGIN
    -- Check that all progress records have valid lesson and profile references
    IF EXISTS (
        SELECT 1 FROM public.progress p 
        LEFT JOIN public.lessons l ON p.lesson_id = l.id 
        LEFT JOIN public.profiles pr ON p.profile_id = pr.id
        WHERE l.id IS NULL OR pr.id IS NULL
    ) THEN
        RAISE EXCEPTION 'Invalid foreign key relationships found in progress table';
    END IF;
    
    -- Check that all submissions have valid assignment and profile references
    IF EXISTS (
        SELECT 1 FROM public.submissions s
        LEFT JOIN public.assignments a ON s.assignment_id = a.id
        LEFT JOIN public.profiles pr ON s.profile_id = pr.id
        WHERE a.id IS NULL OR pr.id IS NULL
    ) THEN
        RAISE EXCEPTION 'Invalid foreign key relationships found in submissions table';
    END IF;
    
    RAISE NOTICE 'All seed data integrity checks passed successfully!';
END $$;
