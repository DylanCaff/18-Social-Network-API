const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const userThought = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } },
                { new: true } 
            );
            if (!userThought) {
                res.status(404).json({ message: 'ID not found' });
                return;
            }
            res.status(200).json(userThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getAllThoughts(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch ((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getThoughtByID(req, res) {
        Thought.findById(req.params.id)
          .then((thought) => res.json(thought))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    getAllThoughtByID(req, res) {
        Thought.findById(req.params.id)
         .then((thought) => res.json(thought))
         .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThoughtByID(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThoughtByID(req, res) {
        Thought.findByIdAndDelete(
            { _id: req.params.id },
            { runValidators: true, new: true }
        ) 
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    async createReaction(req, res) {
        try {
            const createReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!createReaction) {
                return res.status(404).json({ meessage: 'ID does not match' });
            }
            res.status(200).json(createReaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        console.log(req.params);
        try {
            const removeReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!removeReaction) {
                return res.status(404).json({ message: 'ID does not match'});
            }
            res.status(200).json(removeReaction);
        }  catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

};