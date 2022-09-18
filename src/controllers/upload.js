//handles upload and store images with middleware function
const fs = require("fs");

const db = require("../models");
const Image = db.images;

//
const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);//check file upload from req.file

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({ //use sequelize model create method to save Image object (type, name, date to mysql DB)
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename  //data is gotten from the uploads folder
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name, //if process is successful save to the tmp folder
        image.data
      );

      return res.send(`File has been uploaded.`);  // and return uploaded message
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};