const postService = require('../services/posts.service');

exports.list = async (req, res) => {
  const posts = await postService.getPosts(req);
  res.send(posts);
};

exports.create = async (req, res) => {
	try {
	const post = await postService.createPost(req.body);
	res.send('Post Saved!');
	}
	catch(err) {
		console.log(err);
		res.send(err);
	}
}

exports.show = async (req, res) => {
	const post = await postService.getOnePost(req.params);
  res.send(post);
}

exports.delete = async (req, res) => {
	try {
		const post = postService.deletePost(req.params.id);
	  res.send('Post & Comments deleted');
  }
  catch (err) {
  	console.log(err);
  	res.send(err);
  }
}

exports.update = async (req, res) => {
	try {
		const post = await postService.editPostType(req.params.id, req.body);
  	res.send(post);
  }
  catch(err) {
  	console.log(err);
  	res.send(err);
  }
}

exports.incrementViews = async (req, res) => {
  const post = await postService.incrementViews(req.body);
  res.send(post);
}