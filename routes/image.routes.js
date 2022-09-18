const express = require("express");
const multer = require('multer');
const {Images} = require("../models/");
const { generateToken, authenticateToken } = require("../utils/jwt.utils");


const imageRouter = express.Router();

const storageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, db) => {
        cb(null, `${file.originalname}--${Date.now()}`);
    }
})

const upload = multer({
    storage: storageEngine,
    limits: {fileSize: 2000000}
})

imageRouter.get("/getimage", (req, res) => {
  res.send("in the getimage route");
});

imageRouter.post('/getimage', upload.single('image'), authenticateToken, async (req, res) => {
    console.log(file)
    console.log("req.user", req.user);

        const image = await Images.create({
          id_User: req.body.first_name,
          image_path: file.path,
        });

    res.send({
        path: file.path
    })

    res.send('testing getimage')
})

module.exports = imageRouter;