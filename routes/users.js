const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers/users');
const auth = require('../middleware/auth');

router.route('/').get(auth, getUsers)

module.exports = router;