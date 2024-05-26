const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env' });

// Internal modules
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const imageRouter = require('./routes/image.js');
// const passportSetup = require('./config/passport.js');
const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://hexpress.vercel.app"
];

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
    secure: false,
    expires: expiryDate,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

// Google authentication routes
app.use("/auth", authRouter);
// Local authentication routes
app.use("/user", userRouter);
app.use("/image", imageRouter);
app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(passport.session());

// Define a function to connect to the database
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB & Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if database connection fails
  }
};

connectDB();