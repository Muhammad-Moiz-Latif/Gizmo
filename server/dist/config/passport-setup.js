"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = require("../routes/userRoutes");
dotenv_1.default.config();
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
console.log(process.env.clientID);
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user by ID when deserializing
        const user = yield userRoutes_1.prisma.user.findUnique({
            where: { id: id },
        });
        // If user is found, pass it to done
        if (user) {
            done(null, user);
        }
        else {
            done(new Error('User not found'));
        }
    }
    catch (error) {
        done(error);
    }
}));
passport_1.default.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "/auth/google/redirect",
}, 
//@ts-ignore
(accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user already exists in the database by their email
        const existingUser = yield userRoutes_1.prisma.user.findUnique({
            where: {
                identifier: profile.emails[0].value, // Use Google account's email as identifier
            }
        });
        console.log(profile.emails[0].value);
        if (existingUser) {
            // If the user exists, continue with this user
            console.log('User already exists: ', existingUser);
            return done(null, existingUser); // Pass the existing user to Passport
        }
        else {
            // Generate a unique username if the user doesn't exist
            let username = profile.displayName;
            // Create a new user if they don't exist
            const newUser = yield userRoutes_1.prisma.user.create({
                data: {
                    username: username, // Ensure unique username
                    password: generateRandomPassword(12), // Generate random password
                    identifier: profile.emails[0].value, // Store user's email as identifier
                    authType: 'GOOGLEID', // Set auth type to 'GOOGLE'
                    img: profile.photos[0].value
                }
            });
            console.log('New user created: ', newUser);
            return done(null, newUser); // Pass the new user to Passport
        }
    }
    catch (error) {
        console.log('Error during Google strategy: ', error);
        return done(error); // Handle errors gracefully
    }
})));
function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}
