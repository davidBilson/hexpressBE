// imageController.js
const multer = require('multer');
const path = require('path');
const ImageModel = require('../models/images.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    if (file && file.originalname) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    } else {
      cb(new Error('Invalid file object'));
    }
  }
});

const upload = multer({
  storage: storage
});

const uploadImage = async (req, res) => {
  try {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'File upload failed' });
      }
      console.log(req.file);
      const imageRes = await ImageModel.create({ image: req.file.filename });
      if (imageRes) {
        return res.status(200).json(imageRes);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getImage = async (req, res) => {
  try {
    const imageRes = await ImageModel.find();
    if (imageRes && imageRes.length > 0) {
      return res.status(200).json(imageRes);
    } else {
      return res.status(404).json({ error: 'No images found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  uploadImage,
  getImage
};
