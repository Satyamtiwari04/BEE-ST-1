// /src/controllers/postController.js
const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implement other CRUD operations similarly
// /src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
// Implement other routes

module.exports = router;
// /src/controllers/commentController.js
const Post = require('../models/postModel');

exports.addCommentToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.comments.push(req.body);
    const savedPost = await post.save();
    res.json(savedPost.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implement other CRUD operations similarly
// /src/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/:postId/comments', commentController.addCommentToPost);
// Implement other routes

module.exports = router;

