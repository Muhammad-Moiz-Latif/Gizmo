# Gizmo Project Deployment Guide

## Deployment Strategy
- **Frontend (React/Vite)**: Vercel
- **Backend (Express)**: Railway or Render
- **Database**: Already on Neon (PostgreSQL)
- **Storage**: Cloudinary (already configured)

## Prerequisites
1. GitHub account (already done ✓)
2. Vercel account (free)
3. Railway/Render account (free tier available)

---

## STEP 1: Prepare Frontend for Vercel

### 1.1 Update environment variables
Your frontend needs a production API URL. Create `.env.production`:

```
VITE_PUBLIC_API_URL=https://your-backend-url.railway.app
```

### 1.2 Ensure build script is correct
Your `client/package.json` already has: `"build": "tsc -b && vite build"` ✓

### 1.3 Create `vercel.json` in client folder
This tells Vercel how to build your frontend.

---

## STEP 2: Prepare Backend for Railway/Render

### 2.1 Update start script
Your `server/package.json` needs TypeScript compilation on deployment.

### 2.2 Create necessary config files

### 2.3 Environment variables needed on Railway/Render:
- `DATABASE_URL` (from Neon)
- `STRIPE_SECRET_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- All other environment variables from your `.env`

---

## STEP 3: Deploy Backend First (Railway recommended)

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → Deploy from GitHub → Select Gizmo repo
4. Railway will auto-detect Node.js
5. Add environment variables from your `.env`
6. Railway will provide a URL like: `https://gizmo.railway.app`

---

## STEP 4: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import Gizmo project
4. Select `client` folder as root
5. Add environment variable: `VITE_PUBLIC_API_URL=<your-railway-url>`
6. Deploy!

---

## Quick Links
- Vercel: https://vercel.com
- Railway: https://railway.app
- Render: https://render.com (alternative)
- Your Repo: https://github.com/Muhammad-Moiz-Latif/Gizmo
