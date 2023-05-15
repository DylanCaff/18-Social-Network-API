const router = require('express').Router();


const {
  getAllUsers,
  createUser,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  addNewFriend,
  removeFriend,
} = require('../../controllers/userController');


router.route('/').get(getAllUsers).post(createUser);


router
  .route('/:id')
  .get(getUserByID)
  .put(updateUserByID)
  .delete(deleteUserByID);


router
  .route('/:id/friends/:friendId')
  .post(addNewFriend)
  .delete(removeFriend);
module.exports = router;