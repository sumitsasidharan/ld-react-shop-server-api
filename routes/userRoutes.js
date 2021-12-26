const {
   updateUser,
   deleteUser,
   getUser,
   getAllUsers,
   getUserStats,
} = require('../controllers/userController');
const {
   verifyTokenAndAuthorization,
   verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);

router.get('/', verifyTokenAndAdmin, getAllUsers);
router.get('/find/:id', verifyTokenAndAdmin, getUser);

router.get('/stats', verifyTokenAndAdmin, getUserStats);

module.exports = router;
