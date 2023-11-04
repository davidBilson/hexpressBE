const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const passport = require('passport');
require("dotenv").config();
const passportSetup = require('./passport.js');
const authRoute = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT;

// Configure express-session
app.use(
  session({
    secret: 'hexpress', // Change this to a strong, random secret
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

const allowedOrigins = [
  "https://hexpress.vercel.app",
  "http://localhost:5173",
  "http://localhost:5000/auth",
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS policy switch it up'));
      }
    },
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "HEAD"],
    credentials: true,
  })
);

app.use("/auth", authRoute);

// Define a function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING); // Use process.env.DB_STRING
    console.log('Connected to MongoDB');
    // Start the server after the database connection is established
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

// Call the connectDB function to initiate the database connection
connectDB();