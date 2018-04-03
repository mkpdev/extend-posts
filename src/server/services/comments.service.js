const Comment = require('../../db/comments/schema.js');

exports.postComment = (data) => {
  const newComment = new Comment({
    createdAt: data.createdAt,
    text: data.text,
    user: data.user,
    post: data.post,
  });
  newComment.save((err) => {
    if (err) {
      return console.log(err);
    }
    const response = 'Comment Posted...';
    return response;
  });
};

exports.deleteComment = async (id) => {
  const comment = await Comment.findOne({ _id: id });
  if (!comment) {
    return console.log('Comment not found!');
  }
  comment.remove();
  return (true);
};

exports.deleteComments = (postId) => {
  Comment.remove(
    { post: postId },
    function (err) {
      if (err) { return console.log(err); }
      console.log('Comments deleted...');
      return (true);
    },
  );
};

exports.getComments = async (data) => {
  const comments = await Comment.find({ post: data.id }).populate('post').populate('user');
  console.log('Get Comments called...');
  return comments;
};
