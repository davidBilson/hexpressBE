const router = require('express').Router();
const passport = require("passport");

const CLIENT_URL = "https://hexpress.vercel.app/";

router.get("/login/failed", (req, res) => {
    
    try {
        res.status(401).json({
            error: true,
            success: false,
            message: "Login failed"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
});

router.get("/login/success", (req, res) => {
    if (req.user) {
        try {
            console.log("login successful");
            res.status(200).json({
                success: true,
                message: "Login successful",
                user: req.user
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "An error occurred"
            });
        }
    } else {
        try {
            console.log("login failed");
            res.status(403).json({
                error: true,
                success: false,
                message: "Not authorized"
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "An error occurred"
            });
        }
    }
});

router.get("/logout", (req, res) => {
    try {
        res.redirect(CLIENT_URL);
        req.logout();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error loggin out",
            error: true
        });
    }
});


router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}));

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

module.exports = router;