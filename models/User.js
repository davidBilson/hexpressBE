const mongoose = require('mongoose')

// Define a schema for the "User" collection
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    phone: {
        type: Number,
    },
    profilePicture: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    savedProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }
})

// Export the model based on the defined schema
module.exports = mongoose.model('User', UserSchema)