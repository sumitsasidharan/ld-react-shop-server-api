const router = require('express').Router();
const {
   createOrder,
   updateOrder,
   deleteOrder,
   getUserOrders,
   getAllOrders,
   getMonthlyIncome,
} = require('../controllers/orderController');
const {
   verifyTokenAndAuthorization,
   verifyTokenAndAdmin,
   verifyToken,
} = require('./verifyToken');

router.post('/', verifyToken, createOrder);
router.put('/:id', verifyTokenAndAdmin, updateOrder);
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);

router.get('/find/:userId', verifyTokenAndAuthorization, getUserOrders);
router.get('/', verifyTokenAndAdmin, getAllOrders);
router.get('/income', verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
