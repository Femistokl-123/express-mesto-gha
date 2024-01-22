const router = require('express').Router();

const {
  getCurrentUser, getUserById, getUsers, updateAvatar, updateUser,
} = require('../controllers/users');

const {
  validateUserEdit,
  validateUserAvatarEdit,
  validateUserID,
} = require('../validate/validate');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', validateUserID, getUserById);

router.patch('/users/me', validateUserEdit, updateUser);

router.patch('/users/me/avatar', validateUserAvatarEdit, updateAvatar);

module.exports = router;
