const express = require('express');

const router = express.Router();

const { registerUser, loginUser, getAuthUser } = require('../controllers/auth');
const auth = require('../middleware/auth');

// api/v1/auth
router.route('/').get(auth, getAuthUser);

// api/v1/auth/register
router.route('/register').post(registerUser);
// api/v1/auth/login
router.route('/login').post(loginUser);

module.exports = router;
