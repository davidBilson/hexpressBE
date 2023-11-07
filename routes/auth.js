const router = require('express').Router();
const passport = require("passport");

const CLIENT_URL = "https://hexpress.vercel.app/";

router.get("/login/failed", (req, res) => {
    console.log("login failed");
    try {
        res.redirect(CLIENT_URL);
        res.status(401).json({
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
        console.log("login successful");
        try {
            res.redirect(CLIENT_URL);
            res.status(200).json({
                success: true,
                message: "Login successful",
                user: req.user
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "An error occurred"
            });
        }
    } else {
        console.log("login failed");
        try {
            res.status(401).json({
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
            message: "An error occurred"
        });
    }
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed"
}));

module.exports = router;