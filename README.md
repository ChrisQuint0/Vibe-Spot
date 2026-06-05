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
├── app/                  # Next.js App Router - Pages, layouts, and API routes
│   ├── (auth)/           # Authentication flows (Login/Register)
│   ├── api/              # Backend API routes for Next.js
│   ├── dashboard/        # User dashboard and recommendation history
│   └── group/            # Collaborative group chat and polling pages
├── components/           # Reusable UI components
│   ├── chat/             # Chat UI, message bubbles, polls
│   ├── maps/             # Mapbox visual components and markers
│   ├── recommendations/  # AI recommendation cards, preference inputs
│   └── ui/               # Generic UI elements (Buttons, Inputs, Modals)
├── lib/                  # Utility functions and external service clients
│   ├── ai/               # AI prompt logic and OpenRouter integration
│   ├── maps/             # Mapbox and Google Places API helpers
│   └── supabase/         # Supabase client setup
├── hooks/                # Custom React hooks (e.g., useAuth, useMap)
├── store/                # Global state management (Zustand/Redux)
└── types/                # TypeScript interfaces and type definitions
```

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
