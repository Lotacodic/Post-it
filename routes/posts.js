const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/user");

// Create new Post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      message: "Post created successfully!",
      data: savedPost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body }, { new: true });
      res.status(200).json({
        message: "Your post has been updated!",
        data: post,
      });
    } else {
      res.status(403).json("You can only update your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body }, { new: true });
      res.status(200).json({
        message: "Your post has been deleted!",
        data: post,
      });
    } else {
      res.status(403).json("You can only delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get timeline post
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.fins({ userId: user._id });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like/dilike a post
router.put("/:id/like", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts.likes.includes(req.body.userId)) {
      await Post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post has been liked!");
    } else {
      await Post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post has been diliked!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
