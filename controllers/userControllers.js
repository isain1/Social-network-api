const { User, Thought } = require('../models');

const userController = {
    getSingleUser({params}, res) {
        User.findOne({_id: params.id}).populate(
            {path: 'thoughts', select: '-__v'}
        ).populate(
            {path: 'friends', select: '-__v'}
        ).select('-__v').then(
            (userData) => {
                if (!userData) {
                    res.status(404).json({message: 'invalid ID'});
                    return;
                }
                res.json(userData);
            }
        ).catch((err) => {
            res.status(400).json(err)
        });
    },

    getUsers(req, res ) {
        User.find().populate(
            {path: 'thoughts', select: '-__v'}
        ).populate(
            {path: 'friends', select: '-__v'}
        ).select(
            (userData) => {
                if (!userData) {
                    res.status(404).json({message: 'invalid ID'});
                    return;
                }
                res.json(userData);
            }
        ).catch((err) => {
            res.status(400).json(err)
        });
    },

    createNewUser({body}, res) {
        User.create(body).then(
            (userData) => {
                res.json(userData)
            }
        ).catch(
            (err) => {
                res.status(400).json(err)
            }
        );
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id}).then(
            (userData) => {
                if (!userData) {
                    res.status(404).json({message: 'Invalid ID'});
                    return;
                }
                res.json(userData);
            }
        ).catch(
            (err) => {
                res.status(400).json(err)
            }
        );
    },

    updateUser({params}, res) {
        User.findOneAndDelete({_id: params.id}, body, {new: true, runValidators: true}).then(
            (userData) => {
                if (!userData) {
                    res.status(404).json({message: 'Invalid ID'});
                    return;
                }
                res.json(userData);
            }
        ).catch(
            (err) => {
                res.status(400).json(err)
            }
        );
    },

    addNewFriend() {
        User.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')}).select('-__v').then(
            (userData) => {
                if (!userData) {
                    res.status(404).json({message: 'invalid ID'});
                    return;
                }
                res.json(userData);
            }
        ).catch((err) => {
            res.status(400).json(err);
        });
    },

    deleteFriend() {
        User.findOneAndUpdate({_id: params.id}, {$pull: {friends: params.friendId}}, {new: true}).populate(
            {path: 'friends', select: '-__v'}
        ).select('-__v').then(
            (userData) => {
                if (!userData) {
                    res.status(404).json({message: 'Invalid Id'});
                    return;
                }
                res.json(userData);
            }
        ).catch((err) => {
            res.status(400).json(err);
        });
    },
};

module.exports = userController;