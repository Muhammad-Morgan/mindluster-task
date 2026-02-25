# Next.js Kanban To-Do

## Overview

This project is a Kanban-style task board built with the Next.js App Router. It
supports creating, editing, deleting, and listing tasks, and presents them in
four workflow columns: Backlog, In Progress, Review, and Done. The UI uses
Bootstrap utility classes, and tasks are persisted in a local JSON file to
simulate a lightweight database.

## Features

- CRUD tasks (create, edit, delete, list)
- Four workflow columns with status-based grouping
- Column drag-and-drop reordering
- Infinite scroll per column to progressively reveal tasks
- Form validation with React Hook Form + Zod
- Optimistic, cached data fetching with TanStack Query

## Tech Used

- Next.js 16 (App Router)
- React 19 + TypeScript
- Bootstrap 5
- TanStack Query
- DnD Kit (column reordering)
- React Hook Form + Zod
- Lucide Icons
- UUID

## Project Structure

This codebase follows an Atomic Design-inspired structure:

- `components/atom` for tiny UI controls (Search, Delete button)
- `components/molecules` for small composites (TaskCard, Breadcrumb)
- `components/organisms` for larger UI blocks (Navbar, TasksList, Create/Edit forms)
- `components/page` for page-level compositions (Dashboard)
- `app` for routes, pages, and API handlers
- `lib/mockData.json` as the mock database

## Data Model

Each task typically contains:

- `id` (UUID)
- `title`
- `description`
- `status` (Backlog, In Progress, Review, Done)
- `createdAt` and `updatedAt` timestamps

## Action Flow

- The UI reads tasks using TanStack Query from `/api/tasks/gettasks`.
- Create/Edit/Delete actions use HTTP requests to API route handlers.
- The edit page loads a single task via a server action.
- Columns are reorderable via drag-and-drop.
- Each column supports infinite scroll to reveal more tasks.

## API Approach

- Uses Next Route Handlers.
- Uses the Node `fs` module to read/write a mock JSON database.
- `lib/mockData.json` provides initial testing data.

## Setup

1. Install dependencies:
   - `npm install`
2. Run the dev server:
   - `npm run dev`
3. Open:
   - `http://localhost:3000`

## Scripts

- `npm run dev` for local development
- `npm run build` for production build
- `npm run start` to run the production server
- `npm run lint` for linting

## Notes and Limitations

- JSON persistence is meant for local development only.
- Concurrent writes are not optimized, as this is a mock database.
- In production, replace JSON with a real database and API layer.

## Future Improvements

- Add user authentication and per-user boards
- Add task labels, priorities, and due dates
- Add search, filter, and sort across columns
- Replace JSON storage with a database (PostgreSQL, Prisma, etc.)

## Message From Me

Hey, I just found out that in deployment the mockData.json won't work.
If I had time I would easily replace with MongoDB + Mongoose or Postregs + Prisma.

If you want I can add it later. However, for now I will just share the live link as it is even if not working CRUD actions. And you can try on your loacal machine and you will find it's working 100%...
