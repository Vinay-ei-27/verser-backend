import express from 'express';
import session from 'express-session';
import passport from 'passport';
import googleStrategy from 'passport-google-oauth2';
const GoogleStrategy = googleStrategy.Strategy;

import * as dotenv from 'dotenv';
import cors from 'cors';
import { ERROR_CODES, MESSAGE } from './global/global.vars.js';
import commonRoute from './routes/common.routes.js';
import { initializeFirebaseApp } from './db/db.js';

dotenv.config();
initializeFirebaseApp();

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb', extended: true }));

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Configure session management (optional, but recommended for Passport)
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

//routes
app.use('/api', commonRoute);

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:4040/auth/google/callback',
      scope: ['profile', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      // You can access user profile information here (e.g., email)
      console.log(profile);
      return done(null, profile);
    }
  )
);

// Route to initiate Google login
app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google login
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/api/home' }), (req, res) => {
  // Successful authentication, redirect to your application
  res.redirect('/api/home');
});

app.all('*', (req, res) => {
  res.status(400).json({
    status: 400,
    message: MESSAGE['400'],
    errorCode: ERROR_CODES.BAD_REQUEST,
  });
});

const PORT = 4040 || process.env.PORT;
app.listen(PORT, () => console.log(`⚡️Server is up and running locally on ${PORT}`));
