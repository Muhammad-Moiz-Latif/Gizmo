
╔════════════════════════════════════════════════════════════════════════╗
║                    GIZMO DEPLOYMENT ARCHITECTURE                      ║
╚════════════════════════════════════════════════════════════════════════╝

BEFORE DEPLOYMENT (Local):
┌──────────────────┐         ┌──────────────────┐         ┌──────────────┐
│  Client          │ HTTP    │  Server          │ SQL     │  Database    │
│  (Vite React)    │◄────────│  (Express/Node)  │◄────────│  (Local)     │
│  :5173           │         │  :3000           │         │  (SQLite)    │
└──────────────────┘         └──────────────────┘         └──────────────┘
   localhost:5173               localhost:3000              ✗ No deployment


AFTER DEPLOYMENT (Production):
┌──────────────────────────────────────────────────────────────────────┐
│                           VERCEL EDGE                                │
├──────────────────────────────────────────────────────────────────────┤
│  Client (React/Vite)                                                 │
│  https://gizmo.vercel.app                                            │
│  Automatically deployed from /client folder                          │
│  Static site + SPA routing                                           │
│  Global CDN for fast loading                                         │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
                    HTTPS API Call
                    (via VITE_PUBLIC_API_URL)
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        RAILWAY CLOUD                                 │
├──────────────────────────────────────────────────────────────────────┤
│  Backend (Express/Node)                                              │
│  https://gizmo-production.railway.app                                │
│  Auto-deployed from /server folder                                   │
│  Handles API requests, authentication, business logic                │
│  Connects to databases and external services                         │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
                    SQL Connection
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      NEON POSTGRES                                   │
├──────────────────────────────────────────────────────────────────────┤
│  Database (PostgreSQL)                                               │
│  DATABASE_URL from Neon console                                      │
│  Already configured ✓                                                │
│  Stores all app data                                                 │
└──────────────────────────────────────────────────────────────────────┘


DATA FLOW:
═════════════════════════════════════════════════════════════════════════

1. USER OPENS APP
   Browser → vercel.app → Downloads React JS
   
2. USER TYPES SOMETHING / CLICKS BUTTON
   Frontend JS → API Call to railway.app
   
3. BACKEND PROCESSES REQUEST
   Express receives request → Business Logic
   
4. BACKEND NEEDS DATA
   Express → PostgreSQL on Neon → Gets data
   
5. BACKEND SENDS RESPONSE
   Express → JSON → Frontend
   
6. FRONTEND DISPLAYS
   React updates UI with new data
   User sees results


KEY SERVICES:
═════════════════════════════════════════════════════════════════════════

VERCEL (Frontend Hosting)
├─ Hosts your React/Vite app
├─ Automatically builds on git push
├─ Global CDN for fast loading
├─ Free tier: 100GB bandwidth/month
├─ Custom domain support
└─ Auto SSL certificates

RAILWAY (Backend Hosting)
├─ Runs your Express server 24/7
├─ Environment variables management
├─ Auto-scaling
├─ Free tier: $5/month credit
├─ Log viewing & debugging
└─ Auto-deploys on git push

NEON (Database)
├─ PostgreSQL hosting
├─ Already configured ✓
├─ Free tier: Good enough for production
├─ Automatic backups
└─ Secure SSL connections

CLOUDINARY (File Storage)
├─ Already configured ✓
├─ Stores product images
├─ Free tier: 25GB bandwidth/month
└─ CDN delivery for fast image loading


DEPLOYMENT CHECKLIST:
═════════════════════════════════════════════════════════════════════════

[ ] 1. Create Railway account (https://railway.app)
[ ] 2. Deploy backend to Railway
[ ] 3. Copy Railway backend URL
[ ] 4. Create Vercel account (https://vercel.com)
[ ] 5. Deploy frontend to Vercel
[ ] 6. Set VITE_PUBLIC_API_URL in Vercel to Railway URL
[ ] 7. Test frontend loads: https://gizmo.vercel.app
[ ] 8. Test API works: F12 → Network tab → API calls work
[ ] 9. Test login: Can login and see dashboard
[ ] 10. Test products: Products load with images
[ ] 11. Test admin: Admin can see stats and data


ENVIRONMENT VARIABLES ON RAILWAY:
═════════════════════════════════════════════════════════════════════════

Required (COPY from your server/.env):
├─ DATABASE_URL              (from Neon)
├─ STRIPE_SECRET_KEY
├─ STRIPE_WEBHOOK_SECRET
├─ CLOUDINARY_CLOUD_NAME
├─ CLOUDINARY_API_KEY
├─ CLOUDINARY_API_SECRET
├─ clientID                  (Google OAuth)
└─ clientSecret              (Google OAuth)


ENVIRONMENT VARIABLES ON VERCEL:
═════════════════════════════════════════════════════════════════════════

Required:
└─ VITE_PUBLIC_API_URL = https://gizmo-production.railway.app


MONITORING & DEBUGGING:
═════════════════════════════════════════════════════════════════════════

Railway Logs:
├─ Settings → Deployments → View build logs
├─ Settings → Logs → View runtime logs
└─ Useful for: "Why is backend throwing errors?"

Vercel Logs:
├─ Deployments → View log
├─ Useful for: "Why won't frontend build?"

Browser Console (F12):
├─ Network tab → Check API calls
├─ Console → Check JavaScript errors
└─ Useful for: "Why isn't frontend talking to backend?"


COMMON ISSUES & SOLUTIONS:
═════════════════════════════════════════════════════════════════════════

Issue: "Cannot reach API" / Network errors
Solution: Check VITE_PUBLIC_API_URL in Vercel settings
         Make sure it has the Railway URL (not localhost!)

Issue: "500 Internal Server Error"
Solution: Check Railway logs for errors
         Make sure all env vars are set on Railway
         Check DATABASE_URL is correct

Issue: Images not loading
Solution: Check CLOUDINARY env vars are correct
         Verify Cloudinary dashboard credentials

Issue: Login fails
Solution: Check clientID and clientSecret on Railway
         Check CORS is enabled on backend
         Check cookies are allowed in browser

Issue: Database errors
Solution: Connect to Neon dashboard
         Run: npx prisma migrate deploy
         Or: npx prisma db push


WHEN EVERYTHING IS WORKING:
═════════════════════════════════════════════════════════════════════════

Frontend URL: https://gizmo.vercel.app
Backend URL:  https://gizmo-production.railway.app
Database:     Neon PostgreSQL

You can:
✓ Share frontend URL with anyone
✓ They can use your app
✓ All data stored securely in Neon
✓ Images hosted on Cloudinary
✓ Payments processed by Stripe

🎉 PROJECT IS LIVE!

═════════════════════════════════════════════════════════════════════════
