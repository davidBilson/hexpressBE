require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "977212066652-8sqvke3b32j2meco5dbd01qeagbs83lj.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
