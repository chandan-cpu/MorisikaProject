const Product = require('../models/Product.Model');
const cloudinary = require('../config/cloudinary');
const streamifier = require("streamifier");
const slugify = require('slugify');
const { default: mongoose } = require('mongoose');

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
      message: "Server Error",
      error: error.message
    })
  }
}

const updateProduct= async (req,res)=>{
  try {
    const productId=req.params.id;

    //finding the product by id
    const product =await Product.findById(productId);
    if(!product){
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    //update text fields if provided
    const fields = [
      "name",
      "description",
      "price",
      "discountPrice",
      "category",
      "brand",
      "stock",
      "featured",
      "isActive"
    ];

    fields.forEach(field=>{
      if(req.body[field]!==undefined)
      {
        product[field]=req.body[field];
      }
    })
       // update slug if name changed
    if (req.body.name) {
      product.slug = slugify(req.body.name, { lower: true });
    }

    if(req.files && req.files.length>0){
      let newImageUrls=[];

      for(const file of req.files){
        const result= await new Promise((resolve,reject)=>{
          const stream=cloudinary.uploader.upload_stream(
            {
              folder: "uploads",
              resource_type: file.mimetype === "application/pdf" ? "raw" : "image"
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
        newImageUrls.push(result.secure_url);
      }
      product.images=newImageUrls;
    }

    await product.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    })
  }
}

const deleteProduct=async(req,res)=>{
  try{
    const productId=req.params.id;

    //Check Ifn the id is valid or not
    if(!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({
        success:false,
        message:"Invalid Product ID"
      })
    }
    const product=await Product.findById(productId);
    if(!product)
    {
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({
      success:true,
      message:"Product deleted successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Server Error",
      error:error.message
    })
  }
}

const getAllProduct=async(req,res)=>{
  try{
    //Sanitize & Valid Pagination

    //This is a ofset Paginantion where we skip the number of records based on the page number and limit and then we take the next set of records based on the limit
    // const page=Math.max(1,parseInt(req.query.page ||1));
    // let limit =parseInt(req.queary.limit ||10);
    // limit=Math.min(limit,50);  //Hard limit to prevent abuse

    // const skip=(page-1)*limit;
    const limit=parseInt(req.query.limit ||10);
    const lastId=req.query.lastId;

    let query={isActive:true};

    //Agar lastId provided hai to uske baad ke records fetch karo
    if(lastId){
      query._id={$lt:lastId}; //Fetch records with id less than lastId for next page
    }

    //Search and catagories filter

    if(req.query.search){
      query.name={$regex:req.query.search, $options:'i'};
    }

    const products=await Product.find(query)
    .sort({_id:-1}) //Sort by newest first
    .limit(limit).lean(); //Use lean for faster queries when you don't need mongoose documents

    res.json({
      products,
      nextCursor:products.length>0?products[products.length-1]._id:null, //Next cursor for pagination
      hasMore:products.length===limit //If we got the number of products equal to limit, there might be more products to fetch
    })
  }
  catch(error){
    console.error(error);
    res.status(500).json({
      success:false,
      message:"Server Error",
      error:error.message
    })
  }
}

module.exports = { createProduct, updateProduct, deleteProduct,getAllProduct };