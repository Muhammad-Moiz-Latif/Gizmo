# ============================================
# GIZMO PROJECT DEPLOYMENT STEPS
# ============================================

## OPTION A: Deploy Backend on Railway (RECOMMENDED)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Start Project"
3. Sign in with GitHub
4. Authorize Railway to access your GitHub repos

### Step 2: Create New Railway Project
1. Click "New Project" → "Deploy from GitHub repo"
2. Select "Muhammad-Moiz-Latif/Gizmo" repository
3. Railway auto-detects Node.js

### Step 3: Configure Environment Variables on Railway
1. Go to "Variables" tab
2. Add all these variables from your `server/.env`:
   - DATABASE_URL (from Neon)
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - clientID (Google OAuth)
   - clientSecret (Google OAuth)

### Step 4: Configure Build & Start Commands
1. Railway should auto-detect package.json
2. If not, set:
   - Build: `npm run build`
   - Start: `npm run prod`

### Step 5: Get Your Backend URL
- Railway gives you a URL like: `https://gizmo-production.railway.app`
- Save this! You'll need it for frontend.

---

## OPTION B: Deploy Backend on Render (Alternative)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repo: "Muhammad-Moiz-Latif/Gizmo"
3. Select "Node" as environment

### Step 3: Configure
- **Name**: gizmo-api
- **Root Directory**: server
- **Build Command**: `npm run build`
- **Start Command**: `npm run prod`

### Step 4: Add Environment Variables
Same as Railway - add all variables from `server/.env`

### Step 5: Get Your Backend URL
- Render gives you a URL like: `https://gizmo-api.onrender.com`

---

## DEPLOY FRONTEND TO VERCEL

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### Step 2: Import Project
1. Click "Add New" → "Project"
2. Select "Import Git Repository"
3. Search for "Gizmo" and select it
4. Click "Import"

### Step 3: Configure Project Settings
- **Framework Preset**: Vite
- **Root Directory**: client
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Add Environment Variable
1. Click "Environment Variables"
2. Add: 
   - Name: `VITE_PUBLIC_API_URL`
   - Value: `https://your-railway-or-render-url` (from backend deployment)
   - Select "Production"

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for deployment to complete
3. Vercel gives you a URL like: `https://gizmo.vercel.app`

---

## POST-DEPLOYMENT CHECKLIST

### ✓ Test API Connection
1. Go to your Vercel frontend URL
2. Open browser console (F12)
3. Check Network tab - should see API calls to your Railway/Render URL
4. No "Connection refused" errors

### ✓ Test Authentication
1. Try logging in (User or Admin)
2. Check if login works and redirects properly

### ✓ Test Product Display
1. Check if categories load
2. Check if products display with images
3. Add to cart, add to wishlist

### ✓ Test Admin Dashboard
1. Login as admin
2. Check if stats load (Users, Products, Orders count)
3. Try adding a category or product

### ✓ Monitor Logs
- Railway: Settings → Logs
- Render: Logs tab
- Vercel: Deployments → Logs

---

## TROUBLESHOOTING

### Issue: "Connection refused" on frontend
**Solution**: Your API URL is wrong
- Check Vercel env var `VITE_PUBLIC_API_URL`
- Make sure it's the Railway/Render URL, not localhost

### Issue: API returns 500 error
**Solution**: Missing environment variables on backend
- Check Railway/Render environment variables
- All vars from `server/.env` must be set

### Issue: Database migration failed
**Solution**: 
- On Railway/Render console, run: `npx prisma migrate deploy`
- Or: `npx prisma db push`

### Issue: Cannot upload images
**Solution**: Cloudinary credentials missing
- Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are set

---

## IMPORTANT NOTES

⚠️ **NEVER commit `.env` files to GitHub** - They're already in `.gitignore`

✓ **Your database is on Neon** - No setup needed

✓ **Your Cloudinary is configured** - Just add env vars

✓ **Stripe is configured** - Just add the keys

✓ **Google OAuth is configured** - Just add the credentials

---

## Deployment URLs After Completion

Frontend: https://gizmo.vercel.app (or your custom domain)
Backend: https://gizmo-production.railway.app (or Render equivalent)
Database: Neon PostgreSQL (already set up)

