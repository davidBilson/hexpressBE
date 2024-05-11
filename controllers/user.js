// const { response } = require('express');
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
                password: hashPassword6
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err,
                success: false,
            }); // send an error response if user creation failed
        }
    },
    signin : async (req, res) => {
        try {
            // destructure user data from the body of the request
            const { email, password} = req.body;

            // find user with the given email
            const user = await UserSchema.findOne({ email });

            if (user) {
                // Compare the provided password with the hashed password in the database
                const isPasswordValid = bcrypt.compare(password, user.password);
                
                if (isPasswordValid) {
                    res.status(200).json({
                        success: true,
                        message: "Login successful",
                        userEmail: user.email,
                        userFirstName: user.firstName,
                        userLastName: user.lastName,
                        id: user._id,
                        error: null
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Incorrect username or password'
                    });
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
    },
    getUserData : async (req, res) => {
        const userId = req.params.id; //extract the userId
        try {

            const user = await UserSchema.findOne({ _id : userId })

            if (user) {

                res.status(200).json(user)

            } else {
                res.json({
                    message: "User not found, proceed to signup",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}