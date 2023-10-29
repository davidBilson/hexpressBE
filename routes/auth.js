const router = require('express').Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:5173/";

router.get("/login/failed", (req, res) => {
    console.log("login failed")
    res.status(401).json({
        success: false,
        message: "Login failed"
    });
});

router.get("/login/success", (req, res) => {
    console.log("login successful")
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: req.user
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Login failed"
        });
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}));

module.exports = router;