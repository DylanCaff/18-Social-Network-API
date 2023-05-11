const router = require('express').Router();

const { get } = require('mongoose');
const {
    getAllThoughts,
    createThought,
    getThroughtID,
    updateThoughtByID,
    deleteThoughtByID,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);


router
    .route('/:id')
    .get(getThroughtID)
    .put(updateThoughtByID)
    .delete(deleteThoughtByID);


router
    .routes('/:thoughtId/reactions')
    .post(createReaction)
    .delete(removeReaction);


router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);



module.exports = router;

