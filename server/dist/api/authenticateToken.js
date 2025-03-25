"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; // Or token from headers, query params, etc.
    if (!token) {
        // If no token, redirect to the default route (e.g., login or homepage)
        return res.redirect('/'); // Default route
    }
    try {
        // Verify the token using your secret key
        const decoded = jsonwebtoken_1.default.verify(token, "SECRET_KEY");
        console.log(decoded);
        // Attach the decoded user data to the request object
        // req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // If token is invalid or expired, redirect to default route
        return res.redirect('/');
    }
};
exports.default = authenticateToken;
