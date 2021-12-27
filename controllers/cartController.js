const CryptoJS = require('crypto-js');
const Cart = require('../models/cartModel');

// CREATE
const createCart = async (req, res) => {
   const newCart = new Cart(req.body);

   try {
      await newCart.save();
      res.status(200).json(newCart);
   } catch (error) {
      res.status(500).json(error.message);
   }
};

// UPDATE
const updateCart = async (req, res) => {
   try {
      const updatedCart = await Cart.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true }
      );

      res.status(200).json(updatedCart);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// DELETE
const deleteCart = async (req, res) => {
   try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json('Cart has been deleted!');
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET USER CART
const getUserCart = async (req, res) => {
   try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) {
         res.status(500).json('cart Not Found');
      } else {
         res.status(200).json(cart);
      }
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET ALL (only admin)
const getAllCarts = async (req, res) => {
   try {
      const carts = await Cart.find();
      res.status(200).json(carts);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

module.exports = {
   createCart,
   updateCart,
   deleteCart,
   getUserCart,
   getAllCarts,
};
