const passport  = require('passport');

const clientHost = "http://localhost:5173";

const googleLogin = (req, res, next) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(
        req,
        res,
        next
    )
}

const googleCallback = (req, res) => {
    passport.authenticate("google", {
        failureRedirect: clientHost,
        successMessage: true,
        failureMessage: true,
    })(req, res, () => {
        
        console.log(req.user)

        res.redirect(clientHost);

    })
}

const getCurrentUser = async (req, res) => {
    
    console.log(req.user)

    if (!req.user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
        })
    } else {
        return res.status(200).json(req.user)
    }
}


module.exports = {
    googleLogin,
    googleCallback,
    getCurrentUser
};