const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env' });
// multer for image upload (test on upload route on FE)
const multer = require('multer');
const path = require('path');
const ImageModel = require('./models/images.js');

// Internal modules
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
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

//// upload routes for images (multer middleware) ////

// specify where you will like to store the images
const storage = multer.diskStorage({
  // specify destination
  destination: (req, file, cb) => {
    cb(null, "./public/images")
  },
  // specify unique name for every file
  filename: (req, file, cb) => {
    if (file && file.originalname) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    } else {
      cb(new Error('Invalid file object'));
    }
  }
})

const upload = multer({
  storage: storage
})

app.post('/upload', upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    const imageRes = await ImageModel.create({image: req.file.filename});
    if (imageRes) {
      // res.status(200).json(imageRes)
      console.log(imageRes);
    }
  } catch (err) {
    console.log(err);
  }
})
app.get('/getImage', async (req, res) => {
  try {
    const imageRes =  await ImageModel.find();
    if (imageRes) {
      res.status(200).json(imageRes)
      console.log(imageRes)
    }
  } catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
})

// Google authentication routes
app.use("/auth", authRouter);
// Local authentication routes
app.use("/user", userRouter);
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
// Call the connectDB function to initiate the database connection
connectDB();