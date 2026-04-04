const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const { uploadFile, createCustomOrder } = require("../controllers/uploadController");

// Upload Image OR PDF (accepts any field name)
router.post("/", upload.any(), uploadFile);
router.post("/custom-order", upload.single("referenceImage"), createCustomOrder);

module.exports = router;