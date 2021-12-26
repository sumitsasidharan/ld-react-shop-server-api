const User = require('../models/userModel');
const CryptoJS = require('crypto-js');

// REGISTER
const register = async (req, res) => {
   const encrypted = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
   ).toString();

   const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: encrypted,
   });

   try {
      await newUser.save();
      res.status(201).json(newUser);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// LOGIN
const login = async (req, res) => {
   try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(401).json('User Not Found!');

      const hashedPassword = CryptoJS.AES.decrypt(
         user.password,
         process.env.SECRET_KEY
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
         res.status(401).json('Wrong Credentials!');
      } else {
         const { password, ...others } = user._doc;
         res.status(200).json(others);
      }
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

exports.register = register;
exports.login = login;
