"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
require("../config/passport-setup");
exports.router = (0, express_1.Router)();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
exports.router.get('/login', (req, res) => {
    res.send('This is the login page');
});
exports.router.get('/logout', (req, res) => {
    res.send('Loggin Out...');
});
// In your authRoutes.js
exports.router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }) // Request profile and email from Google
);
// Google OAuth callback
exports.router.get('/google/redirect', passport_1.default.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}`, // Handle failure cases
}), (req, res) => {
    if (req.user) {
        // Assuming `req.user` contains the authenticated user object
        //@ts-ignore
        const userId = req.user.id; // Extract the user ID
        res.redirect(`${FRONTEND_URL}/dashboard/${userId}`); // Pass userId as query parameter
    }
    else {
        res.redirect(`${FRONTEND_URL}`); // Redirect to home on failure
    }
});
