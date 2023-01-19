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


router.route('/').get(getThoughts);

router.route('/:id').get(getSingleThought);
router.route('/:id').put(updateThought);
router.route('/:id').delete(deleteThought);

//for creating new thoughts and reactions
router.route('/:thoughtID').post(createNewThought);
router.route('/:thoughtID/reactions').post(createReaction);

//for deleting reactions
router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);
 

module.exports = router;
