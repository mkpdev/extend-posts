const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    views: Number,
    createdAt: Date,
    type: String,
  },
  {
    collection: 'commentSchema',
  },
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
