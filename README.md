# PawPedia

PawPedia is a pet encyclopedia web application that lets you explore different animal breeds. Built with React, TypeScript, and Vite.

## Sections

- **Gatos** (`/cats`) — Explore cat breeds
- **Perros** (`/dogs`) — Explore dog breeds
- **Vacunos** (`/vacunos`) — Explore cattle breeds
- **Caballos** (`/caballos`) — Explore horse breeds

## Features

- Browse breeds by category with pagination
- Search breeds by name
- View detailed breed information including origin, temperament, physical characteristics, and more
- Dark/light theme toggle
- Responsive design
- Image zoom modal

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for routing
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## API

The application fetches data from JSON endpoints:

- `/cats.json` — Cat breeds
- `/dogs.json` — Dog breeds
- `/cattle.json` — Cattle breeds
- `/horses.json` — Horse breeds

Set the base URL in `.env.local`:

```
VITE_API_URL=your_api_base_url
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── BreedCard.tsx
│   ├── BreedDetails.tsx
│   ├── CattleDetails.tsx
│   ├── HorseDetails.tsx
│   ├── PetDetails.tsx
│   └── ...
├── hooks/             # Custom React hooks
├── layouts/           # Page layouts
├── lib/               # API functions and utilities
│   ├── api.ts
│   └── utils.ts
├── pages/             # Route pages
│   ├── HomePage.tsx
│   └── DetailsPage.tsx
└── providers/         # Context providers
```
