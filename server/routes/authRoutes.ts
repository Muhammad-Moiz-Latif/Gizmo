import { Router } from "express";
import passport from "passport";
import  '../config/passport-setup';
import { Request, Response } from 'express';

export const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';


router.get('/login', (req : Request, res : Response) => {
    res.send('This is the login page')
})

router.get('/logout', (req : Request, res : Response) => {
    res.send('Loggin Out...')
})

// In your authRoutes.js
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] }) // Request profile and email from Google
  );
  
  // Google OAuth callback
  router.get(
    '/google/redirect',
    passport.authenticate('google', {
      failureRedirect: `${FRONTEND_URL}`, // Handle failure cases
    }),
    (req : Request, res : Response) => {
      if (req.user) {
        // Assuming `req.user` contains the authenticated user object
        //@ts-ignore
        const userId = req.user.id; // Extract the user ID
        res.redirect(`${FRONTEND_URL}/dashboard/${userId}`); // Pass userId as query parameter
      } else {
        res.redirect(`${FRONTEND_URL}`); // Redirect to home on failure
      }
    }
  );
  
  


