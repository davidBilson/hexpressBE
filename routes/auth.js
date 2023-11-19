const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.get("/google", authController.googleLogin);

router.get("/google/callback", authController.googleCallback);

router.get("/getCurrentUser", authController.getCurrentUser);

const authRouter = router;
module.exports = authRouter;