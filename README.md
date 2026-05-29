# Rafay ProjectWeb

A premium e-commerce web app with React, Tailwind CSS, Redux Toolkit, Express, TypeORM, and PostgreSQL.

## Structure

- `frontend/` - React + Vite front-end application
- `backend/` - Express API server with TypeORM and PostgreSQL

## Features

- Product browsing with search, filter, sort, and pagination
- Cart and checkout flow
- Admin dashboard with order management
- Product CRUD support from the admin panel
- Premium dark glass UI theme

## Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend expects PostgreSQL at `localhost:5432` and currently uses:
- database: `mens_store`
- user: `postgres`
- password: `1234`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### GitHub Upload

1. Install Git: https://git-scm.com/
2. Initialize the repo:
   ```bash
   cd c:\rafay\projectweb
   git init
   git add .
   git commit -m "Initial project upload"
   ```
3. Create a GitHub repo and add remote:
   ```bash
   git remote add origin https://github.com/<username>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

## Notes

- If Git is unavailable, install it before pushing to GitHub.
- This repository includes both frontend and backend folders in a single monorepo.
