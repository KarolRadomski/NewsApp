const asyncHandler = require('express-async-handler');
const Comments = require('../models/commentModel');

// @desc    Get comments for news
// @route   GET /api/comments/:id
// @access  Public
const getCommentsForNews = asyncHandler(async (req, res) => {
  const comments = await Comments.find({ NewsId: req.params.id });
  res.json(comments);
});

// @desc    ADD comments for news
// @route   POST /api/comments/:id
// @access  Public
const setCommentsForNews = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.username) {
    res.status(400);
    throw new Error('Missing data');
  }
  const comment = await Comments.create({
    text: req.body.text,
    likesCounter: 0,
    username: req.body.username,
    NewsId: req.params.id,
  });
  res.json(comment);
});

// @desc    Increment likesCounter for comment
// @route   PUT /api/comments/increment/:id
// @access  Public
const incrementLikesCounter = asyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);
  if (!comment) {
    res.status(400);
    throw new Error('Comment not found');
  } else if (!req.params.id) {
    throw new Error('Please enter comment id');
  }

  const updatedComment = await Comments.findOneAndUpdate(
    { _id: req.params.id },
    {
      likesCounter: comment.likesCounter + 1,
    },
    { new: true }
  );

  res.json(updatedComment);
});

// @desc    Decrement likesCounter for comment
// @route   PUT /api/comments/decrement/:id
// @access  Public
const decrementLikesCounter = asyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);
  if (!comment) {
    res.status(400);
    throw new Error('Comment not found');
  } else if (!req.params.id) {
    throw new Error('Please enter comment id');
  }

  const updatedComment = await Comments.findOneAndUpdate(
    { _id: req.params.id },
    {
      likesCounter: comment.likesCounter - 1,
    },
    { new: true }
  );

  res.json(updatedComment);
});

// @desc    Delete one comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);
  if (!comment) {
    res.status(400);
    throw new Error('Comment not found');
  } else if (!req.params.id) {
    throw new Error('Please enter comment id');
  }

  const deletedComment = await Comments.findOneAndDelete(
    { _id: req.params.id },
    { new: true }
  );

  res.json(deletedComment);
});

module.exports = {
  getCommentsForNews,
  setCommentsForNews,
  incrementLikesCounter,
  decrementLikesCounter,
  deleteComment,
};
