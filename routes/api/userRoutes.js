const express = require('express');
const router = express.Router();

const {
    getSingleUser, 
    getUsers,
    createNewUser,
    deleteUser,
    updateUser, 
    addNewFriend,
    deleteFriend
} = require('../../controllers/thoughtControllers');

//for finding all users
router.route('/').get(getUsers);

//for finding, updating, and deleting users by id
router.route('/:id').get(getSingleUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

//for creating new users
router.route('/').post(createNewUser);

//for adding/deleting friends
router.route('/:id/friendID').post(addNewFriend);
router.route('/:id/friendID').delete(deleteFriend);


module.exports = router;