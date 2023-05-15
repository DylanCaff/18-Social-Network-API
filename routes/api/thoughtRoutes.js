const router = require('express').Router();


const {
  getAllThoughts,
  createThought,
  getThoughtByID,
  updateThoughtByID,
  deleteThoughtByID,
  createReaction,
  removeReaction,
} = require('../../controllers/thoughtController');


router.route('/').get(getAllThoughts).post(createThought);


router
  .route('/:id')
  .get(getThoughtByID)
  .put(updateThoughtByID)
  .delete(deleteThoughtByID);


router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(removeReaction);


router.route('/:Id/reactions/:reactionId').delete(removeReaction);
module.exports = router;