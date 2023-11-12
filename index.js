const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env' });

// Internal modules
const authRoute = require('./routes/auth.js');
const passportSetup = require('./config/passport.js');

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = ["https://hexpress.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS policy'));
      }
    },
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "HEAD"],
    credentials: true,
  })
);

const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

app.use(session({
  secret: process.env.EXPRESS_SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    expires: expiryDate,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use google authentication
app.use("/auth", authRoute);

app.use(passport.initialize());
app.use(passport.session());

// Define a function to connect to the database
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if database connection fails
  }
};

// Call the connectDB function to initiate the database connection
connectDB();