const router = require('express').Router();
const { testUser } = require('../controllers/userController');

router.get('/', testUser);

module.exports = router;
