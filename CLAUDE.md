# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing a note-taking web application with:
- **frontend/**: Next.js 16 application (React 19, TypeScript, Tailwind CSS 4)
- **backend/**: Rails 8.1 API (Ruby 3.4.8, SQLite)

## Development Commands

### Frontend (from `/frontend`)
```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Backend (from `/backend`)
```bash
bin/rails server  # Start Rails server (default port 3000)
bin/rails test    # Run test suite
bin/rails db:migrate    # Run database migrations
bin/rubocop       # Run Ruby linter (uses rubocop-rails-omakase)
bin/brakeman      # Security analysis
```

## Architecture

### Frontend Structure
- Uses Next.js App Router (`app/` directory)
- Path alias: `@/*` maps to root
- Styling: Tailwind CSS 4 with CSS variables for theming
- ESLint: `eslint-config-next` with core-web-vitals and TypeScript rules

### Backend Structure
- API-only Rails application
- Database: SQLite (stored in `storage/`)
- Uses Solid Cache, Solid Queue, Solid Cable for background jobs and caching
- Deployment: Docker via Kamal

### API Routes
- `resources :groups` - CRUD endpoints for groups
- Health check: `GET /up`

## Key Configurations

### TypeScript
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler

### Package Manager
- Frontend uses pnpm (see `pnpm-workspace.yaml`)
