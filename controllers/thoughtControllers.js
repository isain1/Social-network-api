const { Thought, User } = require('../models');

const thoughtsController = {

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId }).then(
            (thoughtData) => {
                if (!thoughtData) {
                    return res.status(400).json({ message: 'ID does not exist'});
                }
                res.json(thoughtData);
            }
        ).catch((err) => {
            res.status(500).json(err);
        });
    },

    getThoughts(req, res) {
        Thought.find().then(
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
        }).then(userData => {
            if(!userData) {
                res.status(400).json({message: 'ID does not exist'});
                return;
            } 
            res.json(userData);
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
            res.json(thoughtData);
        }).catch((err) => {
            res.status(400).json(err)
        })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true, runValidators: true})
        .then((thoughtData) => {
            if (!thoughtData) {
                return res.status(400).json({ message: 'ID does not match'});
            }
            res.json(thoughtData);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }, 

    createReaction() {
        
    }
    
};

module.exports = thoughtsController;
