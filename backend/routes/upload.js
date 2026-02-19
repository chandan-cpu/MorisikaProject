const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const { uploadFile } = require("../controllers/uploadController");

// Upload Image OR PDF (accepts any field name)
router.post("/", upload.any(), uploadFile);

module.exports = router;