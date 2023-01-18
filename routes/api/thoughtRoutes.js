const express = require('express');
const router = express.Router();

const {
    getSingleThought, 
    getThoughts,
    createNewThought,
    deleteThought,
    updateThought, 
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtControllers');

//for finding all thoughts
router.route('/').get(getThoughts);

//for finding, updating, and deleting thought by id
router.route('/:id').get(getSingleThought);
router.route('/:id').put(updateThought);
router.route('/:id').delete(deleteThought);

//for creating new thoughts and reactions
router.route('/:userID').post(createNewThought);
router.route('/:userID/reactions').post(createReaction);

//for deleting reactions
router.route('/:thoughtID/reaction/:reactionID').delete(deleteReaction);


module.exports = router;
