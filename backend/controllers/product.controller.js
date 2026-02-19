const Product = require('../models/Product.Model');
const cloudinary = require('../config/cloudinary');
const streamifier = require("streamifier");
const slugify = require('slugify');

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      featured
    } = req.body;
console.log("reached create product controller");
    //Array to store the image URLs
    let imageUrls = [];

    //If user uploaded the images
    if (req.files && req.files.length > 0) {

      //loop through each file and upload to cloudinary
      for (const file of req.files) {

        // Detect resource type
        let resourceType = "image";
        if (file.mimetype === "application/pdf") {
          resourceType = "raw"; // Cloudinary uses "raw" for PDF
        }
        //upload buffer to cloudinary

        const result= await new Promise((resolve,reject)=>{
          const stream=cloudinary.uploader.upload_stream(
            {
              folder: "uploads",
              resource_type: resourceType,
            },
            (error,result)=>{
              if(error){
                return reject(error);
              }
              resolve(result);
            }
          )
           streamifier.createReadStream(file.buffer).pipe(stream);
        })
        imageUrls.push(result.secure_url);
      
      }
    }

    // Create product using your schema
    const product = new Product({
      name,
      slug: slugify(name, { lower: true }),
      description,
      price,
      discountPrice,
      category,
      brand,
      stock,
      featured,
      images: imageUrls
    })
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
}

module.exports = { createProduct };