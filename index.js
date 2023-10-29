const express = require('express');
const cors = require('cors');
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport')


// initialize cookieSession
app.use(cookieSession(
    {
        name: "session",
        keys: ["hexpress"],
        maxAge: 24 * 60 * 60 * 100,


    }
))

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: " http://localhost:5173",
    methods: "GET, PUT, PATCH, POST, DELETE",

}))

app.listen("5000", () => {
    console.log("Server is running on port " + 5000)
})
 

// const mongoose = require('mongoose');
// require("dotenv").config()


// const PORT = process.env.PORT || 3000;

// const allowedOrigins = [
//     'https://localhost:3000'
// ]
// app.use(cors({
//     origin: function(origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true)
//         } else {
//             callback(new Error('Origin now allowed by CORS policy, verify and try again...'))
//         }
//     },
//     methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//     credentials: true,
//     preflightContinue: false,
//     optionsSuccessStatus: 204
// }))

// app.use(cors())
// app.use(express.json())

// // Define a function to connect to the database
// const connectDB = async () => {
//   try {
//     // await mongoose.connect(process.env.DB_STRING); // Use process.env.DB_STRING
//     console.log('Connected to MongoDB');
//     // Start the server after the database connection is established
//     app.listen(PORT, () => {
//       console.log(`Server is listening on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// };

// // Call the connectDB function to initiate the database connection
// connectDB();

