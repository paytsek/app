const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getAuthUser } = require('../controllers/auth');
const auth = require('../middleware/auth')

router.route('/').get(auth, getAuthUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
