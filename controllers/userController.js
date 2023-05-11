const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getAllUsers(req, res) {
    User.find()
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  getUserByID(req, res) {
    User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  deleteUserByID(req, res) {
    User.findByIdAndDelete(
      { _id: req.params.id },
      {runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  async addNewFriend(req, res) {
    try {
      const addFriend = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friends: req.params.friendId} },
        { new: true, runValidators: true }
      );
      if (!addFriend) {
        return res.status(404).json({ message: 'ID does not match'});
      }
      res.status(200).json(addFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const removeFriend = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId} },
        { new: true, runValidators: true }
      );
      if (!removeFriend) {
        return res.status(404).json({ message: 'ID does not match'});
      }
      res.status(200).json(removeFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
