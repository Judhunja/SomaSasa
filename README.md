# Elimu Hub - Community-Powered Learning Platform

> **Empowering Education in Kenya through Technology** 🇰🇪  
> Supporting UN SDG 4: Quality Education for All

## 🎯 Overview

Elimu Hub is a Progressive Web App (PWA) designed to democratize education access in Kenya through:

- **Peer Learning**: Study circles, mentorship, and teaching points system
- **Adaptive AI Tutor**: Personalized learning paths and instant Q&A support
- **Offline-First Design**: Works without internet via service workers and IndexedDB
- **USSD Integration**: Parents can check progress via `*789*12349#` on any phone
- **Practical Skills**: Financial literacy, digital skills, entrepreneurship, and agri-tech

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Supabase      │    │  Africa's       │
│   (Vite/React)  │◄──►│   (Database)     │    │  Talking USSD   │
│   + PWA Cache   │    │   + Edge Funcs   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         ▲                        ▲                       ▲
         │                        │                       │
         ▼                        ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Service       │    │    Real-time     │    │   AI Client     │
│   Worker        │    │    Subscriptions │    │   (Mock/Real)   │
│   (Offline)     │    │    (Chat/Sync)   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Supabase CLI
- Git

### Local Development

1. **Clone and Install**
   ```bash
   git clone <repo-url>
   cd SomaNow
   cd web && npm install
   ```

2. **Set up Supabase**
   ```bash
   npx supabase init
   npx supabase start
   npx supabase db reset
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Fill in your Supabase project URL and anon key
   ```

4. **Start Development**
   ```bash
   # Terminal 1: Frontend
   cd web && npm run dev
   
   # Terminal 2: Supabase Functions
   npx supabase functions serve
   ```

5. **Access the App**
   - Frontend: http://localhost:5173
   - Supabase Studio: http://localhost:54323

### Testing USSD Locally

```bash
# Expose local endpoint
npx ngrok http 54321

# Set webhook URL in Africa's Talking dashboard:
# https://your-ngrok-url.ngrok.io/functions/v1/ussd-webhook
```

## 📱 USSD Flow Diagram

```
*789*12349# → Main Menu
├── 1. Check Child Progress
│   ├── Enter Phone Number
│   └── View Latest 5 Scores
├── 2. Get Assignments  
│   ├── Today's Tasks
│   └── Submit Short Answer
├── 3. Parent Dashboard
│   ├── Learning Time Stats
│   └── Achievements
└── 0. Help & Support
```

## 🛠️ Tech Stack

### Frontend
- **Vite + React**: Fast development and build
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Service Worker**: Offline functionality
- **IndexedDB**: Local data storage

### Backend
- **Supabase**: Database, Auth, Storage, Real-time
- **Edge Functions**: Serverless compute (Deno)
- **Row Level Security**: Data protection
- **Africa's Talking**: USSD integration

### Key Design Decisions

**Why Supabase Edge Functions over Express Server?**
- ✅ Native integration with Supabase Auth/DB
- ✅ Automatic scaling and global edge deployment
- ✅ Built-in security with RLS integration
- ✅ TypeScript/Deno runtime with modern APIs
- ✅ No server maintenance required

## 🗄️ Database Schema

See `supabase/migrations/` for complete schema. Key entities:

- **profiles**: User accounts with roles (student/mentor/parent)
- **lessons**: Curriculum content with metadata
- **progress**: User learning progress tracking
- **circles**: Study groups and peer learning
- **submissions**: Assignment answers and scores
- **parent_child**: Family relationships for USSD access

## 🔒 Security & Privacy

### Row Level Security (RLS)
- Users can only access their own data
- Public curriculum is readable by all authenticated users
- Mentors can moderate their own circles
- Parents can only view their children's progress

### Data Protection
- Phone numbers are hashed for USSD lookup
- PII is redacted from long-term logs
- JWT tokens for secure API access
- Rate limiting on AI and USSD endpoints

## 🌐 Internationalization

Currently supports:
- English (default)
- Swahili (Kiswahili)

Add new languages in `web/src/lib/i18n.js`

## 📊 Key Performance Indicators

- **Daily Active Users (DAU)**
- **Lessons Completed per User**
- **Average Score Improvement (4-week rolling)**
- **Active Learning Circles**
- **USSD Monthly Active Parents**
- **Mentorship Matches Completed**

## 🧪 Testing

```bash
# Unit Tests
cd web && npm run test

# Linting
npm run lint

# Type Checking
npm run type-check

# E2E Tests (if implemented)
npm run cypress
```

## 🚀 Deployment

### Frontend (Vercel - Recommended)

```bash
# Connect to Vercel
npx vercel

# Set environment variables in Vercel dashboard
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (Supabase Edge Functions)

```bash
# Deploy all functions
npx supabase functions deploy

# Deploy specific function
npx supabase functions deploy ussd-webhook
```

### USSD Setup (Africa's Talking)

1. Login to [Africa's Talking Dashboard](https://account.africastalking.com/)
2. Navigate to USSD → Create New App
3. Set USSD Code: `*789*12349#`
4. Set Callback URL: `https://your-project.supabase.co/functions/v1/ussd-webhook`
5. Add credentials to environment variables

## 🔧 Environment Variables

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE=your-service-role-key

# Africa's Talking
AT_USERNAME=your-username
AT_API_KEY=your-api-key
AT_USSD_SERVICE_CODE=12349

# AI Provider (optional)
VITE_AI_PROVIDER=mock
VITE_AI_KEY=your-ai-key
```

## 📈 Monitoring & Analytics

- **Supabase Logs**: Function execution and errors
- **Browser Analytics**: PWA installation and usage
- **USSD Analytics**: Session completion rates
- **Learning Analytics**: Progress and engagement metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: GitHub Issues for bug reports and feature requests
- **Community**: Join our Discord for discussions

---

**Built with ❤️ for education in Kenya**  
*Supporting UN Sustainable Development Goal 4: Quality Education*
# SomaNow
