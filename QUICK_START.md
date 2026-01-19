╔══════════════════════════════════════════════════════════════════╗
║        GIZMO DEPLOYMENT QUICK START - FOLLOW THIS ORDER           ║
╚══════════════════════════════════════════════════════════════════╝

🎯 WHAT YOU HAVE:
✓ Fixed Frontend (React/Vite) ready
✓ Fixed Backend (Express) ready  
✓ Database on Neon (PostgreSQL)
✓ Cloudinary for images
✓ All configs pushed to GitHub

═════════════════════════════════════════════════════════════════════

📋 DEPLOYMENT ORDER (Follow this exactly):

STEP 1: DEPLOY BACKEND (5-10 minutes)
────────────────────────────────────

Choose ONE:

🚂 RAILWAY (RECOMMENDED - Easier)
  1. Go to: https://railway.app
  2. Sign up with GitHub
  3. Click "New Project" → "Deploy from GitHub"
  4. Select your Gizmo repo
  5. Go to "Variables" tab
  6. Add ALL these variables from your server/.env:
     • DATABASE_URL (from Neon)
     • STRIPE_SECRET_KEY
     • STRIPE_WEBHOOK_SECRET
     • CLOUDINARY_CLOUD_NAME
     • CLOUDINARY_API_KEY
     • CLOUDINARY_API_SECRET
     • clientID
     • clientSecret
  7. Wait for deployment ✓
  8. Copy your URL: https://gizmo-production.railway.app

OR 🎨 RENDER (Alternative)
  1. Go to: https://render.com
  2. Sign up with GitHub
  3. Click "New +" → "Web Service"
  4. Connect GitHub repo
  5. Root Directory: server
  6. Build: npm run build
  7. Start: npm run prod
  8. Add all same environment variables
  9. Copy your URL: https://gizmo-api.onrender.com

═════════════════════════════════════════════════════════════════════

STEP 2: DEPLOY FRONTEND (5-10 minutes)
───────────────────────────────────────

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Select "Muhammad-Moiz-Latif/Gizmo"
5. Root Directory: client ← IMPORTANT!
6. Add Environment Variable:
   • Name: VITE_PUBLIC_API_URL
   • Value: <paste your Railway/Render URL from Step 1>
7. Click "Deploy"
8. Wait 2-3 minutes ✓
9. Get your URL: https://gizmo.vercel.app

═════════════════════════════════════════════════════════════════════

✅ VERIFY DEPLOYMENT:

1. Open https://gizmo.vercel.app in browser
2. Open DevTools (F12)
3. Go to "Network" tab
4. Refresh page
5. Check if API calls go to your Railway/Render URL (NOT localhost)
6. No red errors in console ✓

Try these features:
  • Homepage loads and shows products
  • Click a product - details page works
  • Add to cart - works
  • Login - works
  • Admin dashboard - shows stats

═════════════════════════════════════════════════════════════════════

🔧 IF SOMETHING BREAKS:

Problem: "Connection refused" or "Cannot reach API"
  → Check your VITE_PUBLIC_API_URL env var in Vercel
  → Make sure it's your Railway/Render URL (not localhost!)
  → Re-deploy frontend

Problem: Database errors on backend
  → Check DATABASE_URL env var on Railway/Render
  → Make sure it's your Neon PostgreSQL URL
  → In Railway/Render console: npx prisma migrate deploy

Problem: Images not loading
  → Check Cloudinary env vars are set correctly
  → Go to your Cloudinary dashboard and verify credentials

Problem: Can't login / 500 errors
  → Check ALL env vars are set on Railway/Render
  → Check server logs in Railway/Render dashboard
  → Google OAuth credentials set? Check clientID and clientSecret

═════════════════════════════════════════════════════════════════════

📞 FINAL CHECKLIST BEFORE GOING LIVE:

□ Backend deployed on Railway/Render
□ Backend URL copied
□ Frontend deployed on Vercel
□ VITE_PUBLIC_API_URL set in Vercel
□ Frontend shows products on homepage
□ Can click products without errors
□ Can login (user and admin)
□ Admin dashboard loads stats
□ Images display correctly
□ No red errors in browser console

═════════════════════════════════════════════════════════════════════

🎉 SUCCESS!

Your app is now live at: https://gizmo.vercel.app
Backend running at: https://gizmo-production.railway.app
Database: Neon PostgreSQL

Share the link with users! 🚀

═════════════════════════════════════════════════════════════════════
