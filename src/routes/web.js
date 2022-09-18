//define routes for upload with Express Router
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

let routes = (app) => {
  router.get("/", homeController.getHome); //GET homepage for the upload form

  router.post("/upload", upload.single("file"), uploadController.uploadFiles);  //POST /upload to call the upload controller. 

  return app.use("/", router);
};

module.exports = routes;