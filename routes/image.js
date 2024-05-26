const express = require('express');
const router = express.Router();
const { uploadImage, getImage } = require('../controllers/imageController');

router.post('/upload', uploadImage);
router.get('/getImage', getImage);

const imageRouter = router;
module.exports = imageRouter;