const UserSchema = require('../models/userModel.js'); // import the user schema
const bcrypt = require('bcrypt'); // import bcrypt for hashing passwords

module.exports = {
    signup : async (req, res) => {
        try {
            const { firstName, lastName, email, password} = req.body; //destructure incoming data from the request body
            
            const existingUser = await UserSchema.findOne({ email }) // check if a user with same email already exists in DB
            
            if (existingUser) {
                return res.status(409).json({
                    message: "User already exists!",
                    success: false
                })
            }

            const hashPassword = await bcrypt.hash(password, 10); // hash the user's password with the salt

            const newUser = await UserSchema.create({
                firstName,
                lastName,
                email,
                password: hashPassword
            })


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Internal server error",
                error: error,
                success: false
            }); // send an error response if user creation failed
        }
    }
}