const Product = require("../models/Product");

//  Create Product
const createProduct = async (req, res) => {
    const { name, slug, description, price, discountPrice, category, brand, stock, images, rating, featured } = req.body;
  try {
    const existingproduct=await Product.find({slug});
    if(existingproduct.length>0)
    {
        Product.stock+=1;
        await existingproduct[0].save();
        return res.status(200).json(existingproduct[0]);
    }
    if (!name || !slug || !price) {
      return res.status(400).json({ message: "Missing required fields: Name, Slug, and Price." });
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//  Get All Products
const getAllProducts = async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
};

//  Get Single Product by Slug
const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product)
    return res.status(404).json({ msg: "Product not found" });

  res.json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductBySlug,
};
