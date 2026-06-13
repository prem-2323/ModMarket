const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

const controller = require("../controllers/sharemodsController");

router.get("/account", controller.accountInfo);

router.get("/files", controller.listFiles);

router.post("/folder", controller.createFolder);

router.post("/upload-url", controller.uploadUrl);

router.post("/upload-local", upload.single('file'), controller.uploadLocal);

module.exports = router;
