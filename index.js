const express = require('express');
const cors = require('cors');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
require("dotenv").config();
const passportSetup = require('./passport.js');
const authRoute = require('./routes/auth.js');

// Initialize cookieSession
app.use(cookieSession({
    name: "session",
    keys: ["hexpress"],
    maxAge: 24 * 60 * 60 * 1000, // Corrected
}));

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173", // Corrected
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"], // Make sure to adjust methods as needed
}));

app.use("/auth", authRoute);

app.listen("5000", () => {
    console.log("Server is running on port 5000");
});
