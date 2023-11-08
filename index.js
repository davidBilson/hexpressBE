require('dotenv').config()
const express = require('express');
const cors = require('cors');
// External Dependencies
const mongoose = require('mongoose');
const cookieSession = require("cookie-session")

const session = require('express-session');
const passport = require('passport');
const app = express();

// Internal Modules
const authRoute = require('./routes/auth.js');
const passportSetup = require('./passport.js');

const PORT = process.env.PORT;
const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

// configure cookie session
app.use(cookieSession({
  name: "session",
  keys: ["hexpress"],
  maxAge: 24 * 60 * 60 * 100,
}))

app.use(passport.initialize()); // init passport on every route call.
app.use(passport.authenticate("session"));
app.use(passport.session()); // allow passport to use "express-session".

const allowedOrigins = ["https://hexpress.vercel.app"];

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
    mongoose.set('strictQuery', false); // Add this line
    await mongoose.connect(process.env.DB_STRING);
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