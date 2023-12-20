const express = require('express');
const userController = require('../controllers/user.js');
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/getUserData/:id", userController.getUserData);

const userRouter = router;
module.exports = userRouter;