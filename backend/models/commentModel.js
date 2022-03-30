const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: [true, 'Missing a comment content'] },
    username: { type: String, required: [true, 'Missing comments author'] },
    likesCounter: { type: Number },
    NewsId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'News',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
