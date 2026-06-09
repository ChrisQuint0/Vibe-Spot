# Vibe Spot - AI-Powered Place Discovery and Collaboration

**Vibe Spot** (Capstone 1) is a platform designed to help users discover places around Pasig City through AI-powered recommendations and enables them to collaboratively decide on a destination with friends. The platform simplifies the group planning process from discovery to decision-making.

## Vision
The focus of Vibe Spot is not merely finding places, but helping groups decide where to go. A user can discover a café, share it with friends, discuss options, create a poll, and collectively decide on a destination without leaving the platform.

## Key Features

- **AI-Powered Discovery**: Tailored location recommendations based on activity preferences, budget, group size, and search scope (using OpenAI via OpenRouter).
- **Interactive Showcase & Map**: A guided showcase of recommended places paired with an interactive map (powered by Mapbox and Google Places API).
- **Collaborative Group Chats**: A functional group chat system (Real-time MVP) to bridge the gap between discovery and group decision-making.
- **Shared Collections & Polls**: Easily share places into the group chat, maintain a shortlist of candidates, and create polls for democratic decision-making.
- **AI Chat Assistant**: Ask a lightweight AI assistant within the group chat for quick suggestions ("Suggest a cheaper alternative," "Find a place with better parking").
- **Saved Places & History**: Bookmark places and revisit previous search sessions.

## Tech Stack

**Frontend**
- Next.js (App Router)
- Tailwind CSS

**Backend**
- Supabase Auth
- Supabase PostgreSQL
- Supabase Realtime
- Supabase Storage

**AI & Machine Learning**
- OpenAI API (via OpenRouter)
- Optional: Personalized Recommendation Engine & Ranking Model

**Maps & Places**
- Mapbox
- Google Places API
- Leaflet (For front-end development only, to be replaced with Mapbox)

## Project Structure

The project is structured using Next.js App Router best practices, making it highly modular and scalable:

```
vibe-spot/
├── app/                      # Next.js App Router - Pages, layouts, and API routes
│   ├── (auth)/               # Authentication route group (Login/Register) [stub]
│   ├── (main)/               # Main authenticated app route group
│   │   ├── discover/         # AI-powered place discovery page
│   │   │   └── page.tsx
│   │   └── layout.tsx        # Shared layout for main app routes
│   ├── api/                  # Backend API routes for Next.js [stub]
│   ├── dashboard/            # User dashboard and recommendation history [stub]
│   ├── group/                # Collaborative group chat and polling pages
│   │   └── [id]/             # Dynamic route for specific group sessions [stub]
│   ├── constants.ts          # Global constants for the app
│   ├── globals.css           # Global styles including Tailwind imports
│   ├── icon.png              # App icon
│   ├── layout.tsx            # Root layout for the application
│   └── page.tsx              # The main landing page entry point
├── components/               # Reusable UI components
│   ├── chat/                 # Chat UI, message bubbles, polls [stub]
│   ├── landing/              # Components specific to the landing page
│   │   ├── AboutDrawer.tsx   # Drawer component for "About" section
│   │   ├── Header.tsx        # Navigation header
│   │   ├── HeroSection.tsx   # Main hero banner with call to actions
│   │   ├── LoadingScreen.tsx # Initial loading animation screen
│   │   ├── MapBackground.tsx # Interactive map background for landing
│   │   ├── SignupModal.tsx   # Modal for user registration
│   │   ├── Toast.tsx         # Notification toast component
│   │   ├── constants.ts      # Constants used within landing components
│   │   └── landing.css       # Specific styles for the landing page
│   ├── layout/               # App-wide layout components
│   │   ├── app-sidebar.tsx   # Main application sidebar
│   │   └── mobile-trigger.tsx # Mobile sidebar toggle trigger
│   ├── maps/                 # Mapbox visual components and markers [stub]
│   ├── recommendations/      # AI recommendation components
│   │   └── preference-wizard.tsx # Multi-step user preference input wizard
│   └── ui/                   # shadcn/ui and generic UI primitives
│       ├── button.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── popover.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       └── tooltip.tsx
├── lib/                      # Utility functions and external service clients
│   ├── ai/                   # AI prompt logic and OpenRouter integration [stub]
│   ├── maps/                 # Mapbox and Google Places API helpers [stub]
│   ├── supabase/             # Supabase client setup [stub]
│   └── utils.ts              # Shared utility helpers (e.g., cn())
├── hooks/                    # Custom React hooks
│   └── use-mobile.ts         # Hook for mobile breakpoint detection
├── public/                   # Static assets
│   ├── vibe_spot_logo_landing.png
│   ├── vibespot_logo_white_nobg.png
│   ├── friends.png
│   ├── location.png
│   ├── mood.png
│   └── wallet.png
├── store/                    # Global state management [stub]
└── types/                    # TypeScript interfaces and type definitions [stub]
```

> **[stub]** directories exist in the file system but are currently empty, awaiting feature implementation.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting Up Environment Variables

To run the project locally, you will need to configure your environment variables. A `.env.local` file is required at the root of the project.

Key variables will likely include:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Mapbox API 
- Google Places API Keys
- OpenRouter/OpenAI API Keys

*(Ensure you have set up these respective platforms and retrieved your keys before testing the app's full capabilities.)*
