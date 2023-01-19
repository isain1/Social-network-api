const { Thought, User } = require('../models');

const thoughtsController = {

    getSingleThought({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions', select: '-__v'}).select('-__v').then(
            (thoughtData) => {
                if (!thoughtData) {
                    return res.status(400).json({ message: 'ID does not exist'});
                    return;
                }
                res.json(thoughtData);
            }
        ).catch((err) => {
            res.status(500).json(err);
        });
    },

    getThoughts(req, res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'}).select('-__v').then(
            (thoughtData) => {
                res.json(thoughtData);
            }
        ).catch((err) => {
            res.status(500).json(err);
        });
    },

    createNewThought({params,body}, res) {
        Thought.create(body).then(({_id}) => {
            return User.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        }).then(thoughtData => {
            if(!thoughtData) {
                res.status(400).json({message: 'ID does not exist'});
                return;
            } 
            res.json(thoughtData);
        }).catch(err => {
            res.status(400).json(err);
        });
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id}).then(
            (thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({message: 'ID does not match'})
                    return;
                } 
                res.json(thoughtData);
            }
        ).catch((err) => {
            res.status(400).json(err)
        })
    },

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true}).populate(
            {path: 'reactions', select: '-__v'}
        ).select('-__v').then(
            (thoughtData) => {
            if (!thoughtData) {
                res.status(400).json({ message: 'ID does not match'});
                return;
            }
            res.json(thoughtData);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }, 

    createReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'}).select('-__v').then(
            (thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({message: 'Invalid ID'});
                return;
            }
            res.json(thoughtData);
        }).catch((err) => {
            res.status(400).json(err);
        });
    },

    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({message: 'Invalid ID'});
                return;
            }
            res.json(thoughtData);
        }).catch((err) => {
            res.status(400).json(err);
        });
    },
    
};

module.exports = thoughtsController;
