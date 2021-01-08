const express = require('express');
const router = express.Router();

const { getUsers, getUser, getCurrentUser } = require('../controllers/users');
const auth = require('../middleware/auth');

router.route('/').get(auth, getUsers);
router.route('/current-user').get(auth, getCurrentUser);
router.route('/:id').get(auth, getUser);

module.exports = router;
