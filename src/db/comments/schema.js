const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    createdAt: Date,
    text: String,
    user: { 
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'User'
     },
    post: { 
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Post'
    },
  },
  {
    collection: 'commentSchema',
  },
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
