require('dotenv').config({ path: './.env' })
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserSchema = require('../models/userModel')

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        passReqToCallback: true,
    },
    // find user by google id or create user
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserSchema.findOne({ googleId: profile.id })
            if (user) {
                return done(null, user);
            }
            const newUser = await UserSchema.create({
                googleId: profile.id,
                email: profile.emails[0].value, // Extract email from google profile
                password: null, // No password is required for OAuth2
            });
            return done(null, newUser)
        } catch (err) {
            console.log(err);
            return done(err);
        }
    }
));

 // passes user id to client side
passport.serializeUser((user, cb) => {
    cb(null, user._id.toString());
});

// return user info as you want via deserialization to req.user
passport.deserializeUser(async (_id, cb) => {
    try {
        const user = await UserSchema.findById(_id);
        cb(null, user);
    } catch (err) {
        cb(err);
    }
})