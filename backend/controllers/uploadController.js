const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (file, options = {}) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });

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

    const result = await uploadToCloudinary(file, {
      folder: "uploads",
      resource_type: resourceType,
    });

    return res.status(200).json({
      message: "Upload successful",
      fileType: file.mimetype,
      url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createCustomOrder = async (req, res) => {
  try {
    const { name, contact, info } = req.body;
    const file = req.file;

    if (!name || !contact) {
      return res.status(400).json({ message: "Name and contact are required" });
    }

    if (!file) {
      return res.status(400).json({ message: "Reference image is required" });
    }

    const isImage = ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.mimetype);
    if (!isImage) {
      return res.status(400).json({ message: "Only JPG, PNG, and WEBP are allowed" });
    }

    const uploadResult = await uploadToCloudinary(file, {
      folder: "custom-orders",
      resource_type: "image",
    });

    const merchantWhatsAppNumber = (process.env.MERCHANT_WHATSAPP_NUMBER || process.env.DEFAULT_WHATSAPP_NUMBER || "918822014259").replace(/\D/g, "");

    const orderMessage = [
      "Hello, I want to place a custom order.",
      "",
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Additional Info: ${info || "N/A"}`,
      `Reference Image: ${uploadResult.secure_url}`,
    ].join("\n");

    const whatsappLink = `https://wa.me/${merchantWhatsAppNumber}?text=${encodeURIComponent(orderMessage)}`;

    return res.status(201).json({
      message: "Custom order received",
      customOrder: {
        name,
        contact,
        info: info || "",
        imageUrl: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
      },
      merchantWhatsAppNumber,
      whatsappLink,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create custom order" });
  }
};