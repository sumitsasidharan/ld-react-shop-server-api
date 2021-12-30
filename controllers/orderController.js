const Order = require('../models/orderModel');

// CREATE
const createOrder = async (req, res) => {
   const newOrder = new Order(req.body);

   try {
      await newOrder.save();
      res.status(200).json(newOrder);
   } catch (error) {
      res.status(500).json(error.message);
   }
};

// UPDATE
const updateOrder = async (req, res) => {
   try {
      const updatedOrder = await Order.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true }
      );

      res.status(200).json(updatedOrder);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// DELETE
const deleteOrder = async (req, res) => {
   try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json('Order has been deleted!');
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
   try {
      const orders = await Order.find({ userId: req.params.userId });
      if (!orders) {
         res.status(500).json('Order Not Found');
      } else {
         res.status(200).json(orders);
      }
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET ALL ORDERS (only admin)
const getAllOrders = async (req, res) => {
   try {
      const orders = await Order.find();
      res.status(200).json(orders);
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
   }
};

// GET MONTHLY INCOME
const getMonthlyIncome = async (req, res) => {
   const productId = req.query.pid;
   const date = new Date();
   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
   const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
   );

   try {
      const income = await Order.aggregate([
         {
            $match: {
               createdAt: { $gte: previousMonth },
               ...(productId && {
                  products: { $elemMatch: { productId } },
               }),
            },
         },
         {
            $project: {
               month: { $month: '$createdAt' },
               sales: '$amount',
            },
         },
         {
            $group: {
               _id: '$month',
               total: { $sum: '$sales' },
            },
         },
      ]);

      res.status(200).json(income);
   } catch (error) {
      res.status(500).json(error.message);
   }
};

module.exports = {
   createOrder,
   updateOrder,
   deleteOrder,
   getUserOrders,
   getAllOrders,
   getMonthlyIncome,
};
