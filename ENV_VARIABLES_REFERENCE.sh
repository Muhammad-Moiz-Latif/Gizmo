#!/bin/bash
# Environment Variables Needed for Deployment
# Copy values from your server/.env file

# ==================== DATABASE ====================
# From Neon Dashboard
DATABASE_URL="postgresql://neondb_owner:password@host/neondb?sslmode=require"

# ==================== STRIPE ====================
# From your Stripe Dashboard
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# ==================== CLOUDINARY ====================
# From your Cloudinary Dashboard
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# ==================== GOOGLE OAUTH ====================
# From Google Cloud Console
clientID="your_client_id.apps.googleusercontent.com"
clientSecret="your_client_secret"

# ==================== SESSION KEY (Optional for Railway) ====================
SESSIONKEY="your_random_secret_key"
