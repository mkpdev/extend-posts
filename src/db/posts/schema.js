const mongoose = require('mongoose');

const postTypeEnum = ['Nature', 'Psychology', 'Music', 'Programming', 'Project Management', 'Other'];
const postSchema = mongoose.Schema(
  {
    views: Number,
    createdAt: Date,
    type: {
      type: String,
      enum: postTypeEnum,
    },
    author: String,
  },
  {
    collection: 'postSchema',
  },
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
