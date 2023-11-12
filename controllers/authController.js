const passport  = require('passport');

const clientHost = "https://hexpress.vercel.app"

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
        console.log(req)
        res.redirect(clientHost)
    })
}

module.exports = {
    googleLogin,
    googleCallback,
};