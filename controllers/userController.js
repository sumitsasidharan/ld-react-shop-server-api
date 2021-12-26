const CryptoJS = require('crypto-js');
const User = require('../models/userModel');

// UPDATE
const updateUser = async (req, res) => {
   if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
         req.body.password,
         process.env.SECRET_KEY
      ).toString();
   }

   try {
      const updatedUser = await User.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true }
      );

      res.status(200).json(updatedUser);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// DELETE
const deleteUser = async (req, res) => {
   try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted!');
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET User (only admin can query the user)
const getUser = async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      if (!user) {
         res.status(500).json('User Not Found');
      } else {
         const { password, ...others } = user._doc;
         res.status(200).json(others);
      }
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET ALL USERS (Only admin can query the users)
const getAllUsers = async (req, res) => {
   const query = req.query.new;
   try {
      // To return latest 5 users
      const users = query
         ? await User.find().sort({ _id: -1 }).limit(5)
         : await User.find({}, '-password');
      res.status(200).json(users);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET USER STATS (only for admin)
const getUserStats = async (req, res) => {
   const date = new Date();
   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

   try {
      const data = await User.aggregate([
         { $match: { createdAt: { $gte: lastYear } } },
         {
            $project: {
               month: { $month: '$createdAt' },
            },
         },
         {
            $group: {
               _id: '$month',
               total: { $sum: 1 },
            },
         },
      ]);

      res.status(200).json(data);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

module.exports = { updateUser, deleteUser, getUser, getAllUsers, getUserStats };
