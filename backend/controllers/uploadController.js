const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.files?.[0] || req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Detect resource type
    let resourceType = "image";
    console.log("MIME type:", file.mimetype);

    if (file.mimetype === "application/pdf") {
      resourceType = "raw"; // Cloudinary uses "raw" for PDF
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Upload failed" });
        }

        return res.status(200).json({
          message: "Upload successful",
          fileType: file.mimetype,
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};