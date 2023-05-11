const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getThroughtID,
    updateThoughtByID,
    deleteThoughtByID,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

