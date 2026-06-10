# AI Interior Architect

> Design Your Dream Space With AI — From idea to interior in seconds.

A premium, full-stack AI-powered interior design studio built with Next.js, React Three Fiber, and OpenAI. Features real-time 3D room visualization, AI design generation, budget optimization, AR preview, and voice-controlled designing.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy and configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase and OpenAI credentials

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## ✨ Features

### 🎨 AI Design Studio
- Interactive 3D room viewer with real-time updates
- Procedural room generation based on user dimensions
- AI-powered design suggestions and recommendations
- Style application with smooth transitions

### 🏠 3D Room Visualization
- Real-time 3D rendering with React Three Fiber
- Orbit controls for rotation and zoom
- Dynamic lighting (Warm, Natural, Cool, Ambient)
- Procedural furniture placement
- Floor textures and wall colors

### 💰 Budget Optimizer
- Interactive budget slider with real-time pie chart
- Itemized cost breakdown with percentage distribution
- AI-powered budget optimization tips
- Category-wise spending analysis

### 🛋 Furniture Marketplace
- AI-curated furniture recommendations
- Filter by category, style, and price
- One-click "Add to Design" integration
- Rating system and price display

### 🎯 Style Gallery
- 7 curated design styles (Modern, Minimalist, Luxury, Scandinavian, Japanese, Industrial, Futuristic)
- One-click style application
- Animated transitions between styles

### 🔄 Before/After Transformation
- Interactive comparison slider
- 3 transformation examples
- Touch-enabled for mobile devices

### 🗣️ AI Architect Chat
- Real-time design modifications via chat
- Voice command support (Web Speech API)
- Smart suggestions for design improvements
- Changes reflect instantly in 3D view

### 📱 AR Preview
- Camera-based furniture placement
- Real-world room scanning
- Interactive furniture positioning

### 🎯 Advanced Features
- AI Mood Detection (image analysis)
- Voice Designing (speech-to-text)
- Smart Home Integration suggestions
- Sustainability scoring

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| React Three Fiber | 3D rendering |
| Three.js | 3D engine |
| Framer Motion | Animations |
| Tailwind CSS v4 | Styling |
| Zustand | State management |
| Supabase | Database & Auth |
| OpenAI | AI design generation |
| TypeScript | Type safety |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-design/   # AI design generation
│   │   ├── analyze-image/     # Image mood analysis
│   │   ├── chat/              # AI chat responses
│   │   ├── budget-optimizer/  # Budget calculations
│   │   └── auth/             # Authentication
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── 3d/
│   │   └── RoomScene.tsx      # 3D room viewer
│   ├── features/
│   │   ├── HeroSection.tsx
│   │   ├── AIDesigner.tsx
│   │   ├── BeforeAfter.tsx
│   │   ├── StyleGallery.tsx
│   │   ├── BudgetOptimizer.tsx
│   │   ├── Marketplace.tsx
│   │   ├── ARPreview.tsx
│   │   ├── AIChat.tsx
│   │   └── AdvancedFeatures.tsx
│   ├── layout/
│   │   └── Navbar.tsx
│   └── ui/                    # Shared UI components
├── lib/
│   ├── utils.ts              # Utility functions
│   ├── supabase.ts           # Supabase client
│   └── openai.ts             # API client
├── store/
│   └── useDesignStore.ts     # Zustand store
└── types/
    └── index.ts              # TypeScript types
```

## 🎨 Design System

- **Primary:** Deep Navy (#0A192F)
- **Accent:** Gold (#D4AF37)
- **Text:** White (#CCD6F6)
- **Muted:** Soft Gray (#8892B0)
- **Typography:** Inter (body), Playfair Display (headings)
- **Effects:** Glassmorphism, gradient text, micro-interactions

## 🔌 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/generate-design` | POST | Generate AI design suggestions |
| `/api/analyze-image` | POST | Analyze image mood/colors/style |
| `/api/chat` | POST | AI chat for design modifications |
| `/api/budget-optimizer` | POST | Calculate optimal budget breakdown |
| `/api/auth` | POST | User authentication |

## 🗄 Database Schema (Supabase)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMP
);

-- Designs table
CREATE TABLE designs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  room_type TEXT,
  dimensions JSONB,
  budget INTEGER,
  style TEXT,
  colors JSONB,
  furniture JSONB,
  lighting TEXT,
  ai_suggestions JSONB,
  total_cost INTEGER,
  created_at TIMESTAMP
);

-- Chat messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  design_id UUID REFERENCES designs(id),
  user_message TEXT,
  ai_response TEXT,
  changes JSONB,
  created_at TIMESTAMP
);
```

## 🌟 Demo Day Wow Factors

1. **Real-time 3D Room Rotation** — Judges can rotate the room on their phone
2. **Instant AI Design Generation** — <30 seconds from config to result
3. **AR Preview** — Place furniture in the actual room via camera
4. **Voice Design** — "Create a gaming room" builds it instantly
5. **Before/After Slider** — Visual transformation at a glance
6. **Budget Optimizer** — Pie chart with AI tips
7. **Chat Interface** — Changes design in real-time
8. **Premium Luxury UI** — Looks like a $50k enterprise product

## 📝 License

MIT
