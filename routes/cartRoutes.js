const {
   createCart,
   updateCart,
   deleteCart,
   getUserCart,
   getAllCarts,
} = require('../controllers/cartController');
const {
   verifyTokenAndAuthorization,
   verifyTokenAndAdmin,
   verifyToken,
} = require('./verifyToken');

const router = require('express').Router();

router.post('/', verifyToken, createCart);
router.put('/:id', verifyTokenAndAuthorization, updateCart);
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);

router.get('/find/:userId', verifyTokenAndAuthorization, getUserCart);
router.get('/', verifyTokenAndAdmin, getAllCarts);

module.exports = router;
