const Post = require('../../db/posts/schema.js');
const commentsService = require('./comments.service');

exports.createPost = (data) => {
  const newPost = new Post({
    views: data.views,
    type: data.type,
    createdAt: data.createdAt,
    author: data.author,
  });
  newPost.save((err, post) => {
    if (err) {
      return console.log(err);
      throw new Error(err);
    }
    console.log('New Post saved...');
    return post;
  });
};

exports.getPosts = () => {
  const posts = Post.find();
  console.log('Get Posts called...');
  return posts;
};

exports.getOnePost = (data) => {
  const post = Post.findOne({ _id: data.id });
  console.log('Get one Post called...');
  return post;
};

exports.incrementViews = async (data) => {
  const post = await Post.findOne({ _id: data.id });
  if (!post) {
    return console.log('Post not found!');
  }
  post.views += 1;
  const updatedPost = await post.save();
  console.log('Increment Views on Post called...');
  return updatedPost;
};

exports.editPostType = async (id, data) => {
  const post = await Post.findOne({ _id: id });
  if (!post) {
    return console.log('Post not found!');
    throw new Error('Post not found');
  }
  post.type = data.newType;
  const updatedPost = await post.save();
  console.log('Edit Post type called...');
  return updatedPost;
};

exports.deletePost = async (id) => {
  console.log('Delete Post called...');
  const post = await Post.findOne({ _id: id });
  if (!post) {
    return console.log('Post not found!');
    throw new Error('Post not found');
  }
  post.remove();
  await commentsService.deleteComments(id);
  return true;
};
