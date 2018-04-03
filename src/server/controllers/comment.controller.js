const commentsService = require('../services/comments.service');

exports.list = async (req, res) => {
  const comments = await commentsService.getComments(req.params);
  res.send(comments);
};

exports.create = async (req, res) => {
  try {
    const comment = commentsService.postComment(req.body);
    res.send(comment);
  } catch(err) {
    console.log(err);
    callback(err);
  }
}

exports.delete = async (req, res) => {
  const comment = await commentsService.deleteComment(req.params.id);
  if (comment) {
    console.log('Comment deleted...');
    res.send('Comment deleted...');
  } else {
    console.log('Can not delete comment!');
    res.send('Can not delete comment!');
  }
}