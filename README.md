# Gizmo

Gizmo is a full-stack technology marketplace for browsing devices, managing a cart and wishlist, creating accounts, and completing Stripe checkout. It also includes an admin area for managing products, categories, users, approvals, and dashboard metrics.

## Highlights

- React and Vite storefront with responsive product, category, cart, wishlist, profile, and checkout pages
- Express and TypeScript API backed by Prisma and PostgreSQL
- Email/password authentication plus Google OAuth
- Cloudinary-backed product image storage
- Stripe checkout and webhook processing
- Redux Toolkit state for catalog, cart, wishlist, and local guest shopping data
- Admin dashboard for products, categories, users, and approvals
- Loading skeletons for catalog, product detail, cart, wishlist, category, profile, and admin views

## Architecture

```text
Browser
  |
  | Vite React app (client)
  | HTTP requests using VITE_PUBLIC_API_URL
  v
Express API (server)
  |-- Passport + session/cookie authentication
  |-- Prisma data access
  |-- Cloudinary image uploads
  |-- Stripe checkout/webhooks
  v
PostgreSQL database
```

The frontend and backend are intentionally separate packages. Run package commands from their respective directories.

## Repository Layout

```text
client/                 React/Vite frontend
  src/App.tsx           Browser routes and Redux provider
  src/Layouts/          User and admin layout shells
  src/pages/            Storefront, account, and admin pages
  src/components/       Reusable UI sections and loading components
  src/state/features/   Redux Toolkit slices
server/                 Express/TypeScript backend
  index.ts              HTTP server and middleware
  routes/               Authentication and application routes
  config/               Passport configuration
  prisma/               Schema, seed data, and migrations
ARCHITECTURE.md         Deployment architecture notes
DEPLOYMENT.md           Deployment walkthrough
QUICK_START.md          Condensed deployment checklist
```

## Requirements

- Node.js 18 or newer
- npm
- PostgreSQL database, local or hosted
- Google OAuth credentials for Google sign-in
- Cloudinary account for product images
- Stripe account for checkout features

## Local Setup

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure the server

Create `server/.env` and set the values required by the API:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
SESSIONKEY=replace-with-a-long-random-value
FRONTEND_URL=http://localhost:5173

STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

clientID=your_google_client_id
clientSecret=your_google_client_secret
```

Never commit `.env` files or real credentials. The checked-in environment reference is a list of variable names, not a place to store production secrets.

### 3. Configure the client

Create `client/.env`:

```env
VITE_PUBLIC_API_URL=http://localhost:3000
```

Vite exposes variables prefixed with `VITE_` to browser code. Do not put private API keys in this file.

### 4. Prepare the database

From `server/`:

```bash
npx prisma generate
npx prisma migrate deploy
```

For a development database where creating a migration is appropriate:

```bash
npx prisma migrate dev
```

Seed data, when needed:

```bash
npm run seed
```

### 5. Start both packages

In terminal 1:

```bash
cd server
npm run dev
```

In terminal 2:

```bash
cd client
npm run dev
```

Open `http://localhost:5173`. The API runs on the port configured by the server, normally `3000`.

## NPM Scripts

### Client

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production bundle |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production bundle locally |

### Server

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the TypeScript API with nodemon |
| `npm run build` | Install, compile TypeScript, and generate Prisma client |
| `npm run prod` | Run the compiled production server |
| `npm run seed` | Seed the database |

## Main Routes

### Storefront

- `/dashboard` home for guest users
- `/dashboard/Category/:CategoryId` product listing
- `/dashboard/Device/:DeviceId` product details
- `/dashboard/cart` shopping cart
- `/dashboard/wishlist` wishlist
- `/dashboard/:UserId` authenticated home
- `/dashboard/:UserId/profile` authenticated profile
- `/Login` login and signup

### Admin

- `/admindashboard` metrics dashboard
- `/admindashboard/devices` product management
- `/admindashboard/categories` category management
- `/admindashboard/users` user list
- `/admindashboard/approvals` approval workflow

## Deployment

The intended deployment split is:

- Frontend: Vercel, with `client` as the root directory
- Backend: Railway or Render, with `server` as the root directory
- Database: Neon PostgreSQL or another PostgreSQL provider
- Images: Cloudinary

Deploy the backend first, then set the deployed backend URL as the frontend's `VITE_PUBLIC_API_URL`. Set `FRONTEND_URL` on the backend to the deployed frontend origin, and update Google OAuth callback URLs for that origin.

Production backend variables are the same names used locally: `DATABASE_URL`, `SESSIONKEY`, `FRONTEND_URL`, Stripe variables, Cloudinary variables, and Google OAuth variables. Use the existing [DEPLOYMENT.md](DEPLOYMENT.md) and [QUICK_START.md](QUICK_START.md) for provider-specific steps.

## Troubleshooting

**The storefront says the API is unavailable**

Check that the server is running and that `client/.env` has the correct `VITE_PUBLIC_API_URL`. Restart Vite after changing environment variables.

**Products or categories do not appear**

Check the browser Network tab and server logs. Confirm the database connection, migrations, and seed data. The UI keeps an empty state separate from an in-flight request, so an empty result after loading indicates no matching records rather than a pending request.

**Google sign-in fails**

Confirm `clientID`, `clientSecret`, `FRONTEND_URL`, and the Google OAuth authorized redirect URI. The callback must point to the server's `/auth/google/redirect` route.

**Images are missing**

Verify the three Cloudinary variables and inspect the image URL returned by the API. Product image paths are stored with the product records.

**Checkout fails**

Verify the Stripe secret key and webhook secret. For local webhook testing, forward Stripe events to the server's `/stripe/webhook` endpoint using the Stripe CLI.

## Validation Before Deployment

```bash
cd client
npm run build
npm run lint

cd ../server
npm run build
```

Then manually verify guest browsing, signup, login, Google sign-in, product details, cart, wishlist, checkout, admin login, and image loading in a production-like environment.

## Notes for Maintainers

- Keep API URLs and response shapes unchanged unless a coordinated frontend/backend change is intended.
- Keep guest cart and wishlist behavior separate from authenticated Redux collections.
- Do not commit credentials, database URLs, Stripe keys, or Cloudinary secrets.
- Catalog loading state is represented by `isLoading` and `hasFetched` in the device and category slices so empty data remains a valid result.
