const express = require('express');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const passport = require('passport');
require("dotenv").config();
const passportSetup = require('./passport.js');
const authRoute = require('./routes/auth.js');

const app = express();

// Configure express-session
app.use(
  session({
    secret: 'your-secret-key', // Change this to a strong, random secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (24 hours)
    },
  })
);

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
