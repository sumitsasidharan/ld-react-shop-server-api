const CryptoJS = require('crypto-js');
const Product = require('../models/productModel');

// CREATE
const createProduct = async (req, res) => {
   const newProduct = new Product(req.body);

   try {
      await newProduct.save();
      res.status(200).json(newProduct);
   } catch (error) {
      res.status(500).json(error.message);
   }
};

// UPDATE
const updateProduct = async (req, res) => {
   try {
      const updatedProduct = await Product.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true }
      );

      res.status(200).json(updatedProduct);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// DELETE
const deleteProduct = async (req, res) => {
   try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json('Product has been deleted!');
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET Product (everyone can fetch a product)
const getProduct = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      if (!product) {
         res.status(500).json('Product Not Found');
      } else {
         res.status(200).json(product);
      }
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET ALL Products
const getAllProducts = async (req, res) => {
   const qNew = req.query.new;
   const qCategory = req.query.category;

   try {
      let products;

      if (qNew) {
         products = await Product.find().sort({ createdAt: -1 }).limit(5);
      } else if (qCategory) {
         products = await Product.find({
            categories: {
               $in: [qCategory],
            },
         });
      } else {
         products = await Product.find();
      }

      res.status(200).json(products);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

module.exports = {
   createProduct,
   updateProduct,
   deleteProduct,
   getProduct,
   getAllProducts,
};
