const mongoose = require('mongoose')

// Define a schema for the "User" collection
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: false,
    },
    googleId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    location: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
        required: true,
    },
    savedProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }
})

// Export the model based on the defined schema
module.exports = mongoose.model('User', UserSchema)