const express = require('express');
const router = express.Router();

const { getUsers, getUser } = require('../controllers/users');
const auth = require('../middleware/auth');

router.route('/').get(auth, getUsers);
router.route('/:id').get(auth, getUser);

module.exports = router;
