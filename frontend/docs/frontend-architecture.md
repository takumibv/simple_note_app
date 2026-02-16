# Frontend Architecture

## Overview

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── types/                 # TypeScript type definitions
│   └── index.ts           # Core domain types
├── lib/                   # Utility libraries
│   └── api/               # API client layer
│       ├── client.ts      # Base HTTP client
│       ├── notes.ts       # Notes API methods
│       ├── groups.ts      # Groups API methods
│       └── index.ts       # Exports
├── components/            # UI components (to be created)
│   ├── ui/               # Shared UI components
│   ├── notes/            # Note-related components
│   ├── groups/           # Group-related components
│   └── layout/           # Layout components
└── docs/                  # Documentation
```

## Type System

### Core Types (`types/index.ts`)

```typescript
interface Note {
  id: number;
  title: string;
  content: string | null;
  group_id: number | null;
  created_at: string;
  updated_at: string;
}

interface Group {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
```

## API Client

### Usage

```typescript
import { notesApi, groupsApi, ApiClientError } from '@/lib/api';

// Fetch all notes
const notes = await notesApi.getAll();

// Fetch notes by group
const groupNotes = await notesApi.getAll({ group_id: 1 });

// Create note
const newNote = await notesApi.create({
  note: { title: 'My Note', content: 'Content' }
});

// Update note
await notesApi.update(1, { note: { title: 'Updated' } });

// Delete note
await notesApi.delete(1);

// Groups
const groups = await groupsApi.getAll();
await groupsApi.create({ group: { name: 'Work' } });
```

### Error Handling

```typescript
try {
  await notesApi.create({ note: { title: '' } });
} catch (error) {
  if (error instanceof ApiClientError) {
    console.error(`Error ${error.status}:`, error.message);
    if (error.errors) {
      // Validation errors: { title: ["can't be blank"] }
      console.error(error.errors);
    }
  }
}
```

## Environment Configuration

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Development

```bash
cd frontend
pnpm dev  # Starts on port 3001
```

## Port Configuration

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
