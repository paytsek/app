const express = require('express');

const router = express.Router();

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserPassword,
  deleteCurrentUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// /api/v1/users
router.route('/').get(auth, admin, getUsers);
// api/v1/users/current-user/password
router.route('/current-user/password').put(auth, updateCurrentUserPassword);
// api/v1/users/current-user
router.route('/current-user').get(auth, getCurrentUser).put(auth, updateCurrentUser).delete(auth, deleteCurrentUser);
// api/v1/users/:id
router.route('/:id').get(auth, getUser).put(auth, admin, updateUser).delete(auth, admin, deleteUser);

module.exports = router;
