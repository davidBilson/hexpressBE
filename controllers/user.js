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
    },
    signin : async (req, res) => {
        try {
            // destructure user data from the body of the request
            const { email, password} = req.body;

            // find user with the given email
            const user = await UserSchema.findOne({ email: email });

            if (user) {
                // Compare the provided password with the hashed password in the database
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    res.status(200).json({
                        success: true,
                        message: "Login successful",
                        userName: user.name,
                        id: user._id
                    })
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect username or password'
                    }); // Send a response indicating incorrect username or password
                }
            } else {
                // Send a response indicating that the user does not exist
                res.json({
                    success: false,
                    message: 'User does not exist'
                }); 
            }

        } catch (err) {
            console.log(err);
            // Send an error response if an error occurs during the login process
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err,
                success: false,
            });
        }
    }
}