<div align="center">

# ⚡ Gizmo

### A full-stack technology marketplace — built for browsing, buying, and managing devices.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Express-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com/)

</div>

---

## ✨ What is Gizmo?

Gizmo is a complete e-commerce platform for a technology marketplace — browse devices, manage a cart and wishlist, create an account (email/password or Google), and check out with Stripe. A full admin console sits alongside it for managing products, categories, users, and approvals.

<table>
<tr>
<td width="50%" valign="top">

### 🛍️ Storefront
- Responsive product & category browsing
- Cart, wishlist, and guest shopping support
- Email/password **and** Google OAuth
- Stripe-powered checkout
- Skeleton loading states throughout

</td>
<td width="50%" valign="top">

### 🛠️ Admin Console
- Product & category management
- User management
- Approval workflows
- Dashboard metrics
- Cloudinary-backed image uploads

</td>
</tr>
</table>

---

## 🏗️ Architecture

```text
┌─────────────────────────┐
│        Browser          │
│  React + Vite storefront│
└────────────┬─────────────┘
             │  HTTP · VITE_PUBLIC_API_URL
             ▼
┌─────────────────────────┐
│      Express API        │
│  ┌─────────────────────┐│
│  │ Passport · Sessions  ││
│  │ Prisma data access   ││
│  │ Cloudinary uploads   ││
│  │ Stripe checkout/hooks││
│  └─────────────────────┘│
└────────────┬─────────────┘
             ▼
┌─────────────────────────┐
│      PostgreSQL          │
└─────────────────────────┘
```

The frontend and backend are **intentionally separate packages** — run their commands from their respective directories.

---

## 📂 Repository Layout

```text
client/                 React/Vite frontend
├─ src/App.tsx           Browser routes and Redux provider
├─ src/Layouts/          User and admin layout shells
├─ src/pages/            Storefront, account, and admin pages
├─ src/components/       Reusable UI sections and loading components
└─ src/state/features/   Redux Toolkit slices

server/                 Express/TypeScript backend
├─ index.ts              HTTP server and middleware
├─ routes/               Authentication and application routes
├─ config/               Passport configuration
└─ prisma/               Schema, seed data, and migrations

ARCHITECTURE.md          Deployment architecture notes
DEPLOYMENT.md            Deployment walkthrough
QUICK_START.md           Condensed deployment checklist
```

---

## ✅ Requirements

| Requirement | Notes |
|---|---|
| **Node.js** | 18 or newer |
| **npm** | — |
| **PostgreSQL** | Local or hosted (Neon recommended) |
| **Google OAuth credentials** | For Google sign-in |
| **Cloudinary account** | For product images |
| **Stripe account** | For checkout features |

---

## 🚀 Local Setup

### 1 · Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2 · Configure the server

Create `server/.env`:

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

> ⚠️ **Never commit `.env` files or real credentials.** The checked-in environment reference is a list of variable names, not a place to store production secrets.

### 3 · Configure the client

Create `client/.env`:

```env
VITE_PUBLIC_API_URL=http://localhost:3000
```

> Vite only exposes variables prefixed with `VITE_` to browser code. Keep private API keys out of this file.

### 4 · Prepare the database

```bash
cd server
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

### 5 · Start both packages

```bash
# terminal 1
cd server && npm run dev

# terminal 2
cd client && npm run dev
```

Open **`http://localhost:5173`**. The API runs on the port configured by the server — normally `3000`.

---

## 📜 NPM Scripts

<table>
<tr><th colspan="2">Client</th></tr>
<tr><td><code>npm run dev</code></td><td>Start the Vite development server</td></tr>
<tr><td><code>npm run build</code></td><td>Type-check and create a production bundle</td></tr>
<tr><td><code>npm run lint</code></td><td>Run ESLint</td></tr>
<tr><td><code>npm run preview</code></td><td>Preview the production bundle locally</td></tr>
</table>

<table>
<tr><th colspan="2">Server</th></tr>
<tr><td><code>npm run dev</code></td><td>Run the TypeScript API with nodemon</td></tr>
<tr><td><code>npm run build</code></td><td>Install, compile TypeScript, and generate Prisma client</td></tr>
<tr><td><code>npm run prod</code></td><td>Run the compiled production server</td></tr>
<tr><td><code>npm run seed</code></td><td>Seed the database</td></tr>
</table>

---

## 🧭 Main Routes

### Storefront

| Route | Description |
|---|---|
| `/dashboard` | Home for guest users |
| `/dashboard/Category/:CategoryId` | Product listing |
| `/dashboard/Device/:DeviceId` | Product details |
| `/dashboard/cart` | Shopping cart |
| `/dashboard/wishlist` | Wishlist |
| `/dashboard/:UserId` | Authenticated home |
| `/dashboard/:UserId/profile` | Authenticated profile |
| `/Login` | Login and signup |

### Admin

| Route | Description |
|---|---|
| `/admindashboard` | Metrics dashboard |
| `/admindashboard/devices` | Product management |
| `/admindashboard/categories` | Category management |
| `/admindashboard/users` | User list |
| `/admindashboard/approvals` | Approval workflow |

---

## ☁️ Deployment

```text
Frontend  →  Vercel            (root directory: client)
Backend   →  Railway / Render  (root directory: server)
Database  →  Neon PostgreSQL   (or another PostgreSQL provider)
Images    →  Cloudinary
```

**Deploy in this order:**

1. Deploy the **backend** first
2. Set the deployed backend URL as the frontend's `VITE_PUBLIC_API_URL`
3. Set `FRONTEND_URL` on the backend to the deployed frontend origin
4. Update the Google OAuth authorized redirect URI for that origin

Production backend variables use the same names as local: `DATABASE_URL`, `SESSIONKEY`, `FRONTEND_URL`, Stripe variables, Cloudinary variables, and Google OAuth variables. See [DEPLOYMENT.md](DEPLOYMENT.md) and [QUICK_START.md](QUICK_START.md) for provider-specific steps.

---

## 🩹 Troubleshooting

<details>
<summary><strong>The storefront says the API is unavailable</strong></summary>
<br>
Check that the server is running and that <code>client/.env</code> has the correct <code>VITE_PUBLIC_API_URL</code>. Restart Vite after changing environment variables.
</details>

<details>
<summary><strong>Products or categories do not appear</strong></summary>
<br>
Check the browser Network tab and server logs. Confirm the database connection, migrations, and seed data. The UI keeps an empty state separate from an in-flight request, so an empty result after loading indicates no matching records rather than a pending request.
</details>

<details>
<summary><strong>Google sign-in fails</strong></summary>
<br>
Confirm <code>clientID</code>, <code>clientSecret</code>, <code>FRONTEND_URL</code>, and the Google OAuth authorized redirect URI. The callback must point to the server's <code>/auth/google/redirect</code> route.
</details>

<details>
<summary><strong>Images are missing</strong></summary>
<br>
Verify the three Cloudinary variables and inspect the image URL returned by the API. Product image paths are stored with the product records.
</details>

<details>
<summary><strong>Checkout fails</strong></summary>
<br>
Verify the Stripe secret key and webhook secret. For local webhook testing, forward Stripe events to the server's <code>/stripe/webhook</code> endpoint using the Stripe CLI.
</details>

---

## ✅ Validation Before Deployment

```bash
cd client
npm run build
npm run lint

cd ../server
npm run build
```

Then manually verify: guest browsing → signup → login → Google sign-in → product details → cart → wishlist → checkout → admin login → image loading, in a production-like environment.

---

## 🧑‍💻 Notes for Maintainers

- Keep API URLs and response shapes unchanged unless a coordinated frontend/backend change is intended.
- Keep guest cart and wishlist behavior separate from authenticated Redux collections.
- Do not commit credentials, database URLs, Stripe keys, or Cloudinary secrets.
- Catalog loading state is represented by `isLoading` and `hasFetched` in the device and category slices so empty data remains a valid result.

<div align="center">

---

Built with React, Express, Prisma, and Stripe.

</div>