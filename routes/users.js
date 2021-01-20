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
} = require('../controllers/users');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.route('/').get(auth, getUsers);
router.route('/current-user/password').put(auth, updateCurrentUserPassword);
router
  .route('/current-user')
  .get(auth, getCurrentUser)
  .put(auth, updateCurrentUser)
  .delete(auth, deleteCurrentUser);
router.route('/:id').get(auth, getUser).put(auth, admin, updateUser);

module.exports = router;
