
const router = require('express').Router();

const {
    getSingleUser, 
    getUsers,
    createNewUser,
    deleteUser,
    updateUser, 
    addNewFriend,
    deleteFriend
} = require('../../controllers/userControllers');

//for finding all users
router.route('/').get(getUsers);
router.route('/').post(createNewUser);

//for finding, updating, and deleting users by id
router.route('/:id').get(getSingleUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

//for adding/deleting friends
router.route('/:id/friends/:friendID').post(addNewFriend);
router.route('/:id/friends/:friendID').delete(deleteFriend);


module.exports = router;