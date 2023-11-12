const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.get("/google", authController.googleLogin);

router.get("/google/callback", authController.googleCallback);

const authRouter = router;
module.exports = authRouter;