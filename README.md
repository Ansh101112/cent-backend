# Cent Stage Backend (Express + Prisma + PostgreSQL)

## Stack
- Node.js + Express
- Prisma ORM + PostgreSQL
- Jest + Supertest for testing
- TypeScript
- Dockerfile (optional)

## Setup
1. Create `.env` from `.env.example` and set `DATABASE_URL`.
2. Install deps:
   - npm install
3. Setup DB and Prisma:
   - npx prisma generate
   - npx prisma migrate dev --name init

## Scripts
- `npm run dev` – start dev server with ts-node + nodemon
- `npm run build` – compile TypeScript to `dist/`
- `npm start` – run compiled server
- `npm test` – run Jest tests

## API
Base URL: `http://localhost:4000`

- GET `/health`
- GET `/api/tasks`
- POST `/api/tasks` { title, description? }
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id` { title?, description?, status? }
- PATCH `/api/tasks/:id/toggle`
- DELETE `/api/tasks/:id`
