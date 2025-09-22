const PostIt = require("../models/postitModels");

exports.getAllPostIt = async (req, res) => {
  try {
    const postIts = await PostIt.find();
    res.status(200).json(postIts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.createPostIt = async (req, res) => {
  try {
    const { title, text } = req.body;
    const postIts = new PostIt({ title, text });
    const savePostIt = await postIts.save();

    res.status(201).json(savePostIt);
  } catch (e) {
    if (e.message === "Validation error") {
      res.status(400).json({ error: "Validation error" });
    } else {
      res.status(500).json({ error: e.message });
    }
  }
};

exports.updatePostIt = async (req, res) => {
  try {
    const postIt = await PostIt.findById(req.params.id);
    if (postIt === null) {
      res.status(404).json({ error: "Post it not found" });
    }
    if (req.body.title != null) {
      postIt.title = req.body.title;
    }
    if (req.body.text != null) {
      postIt.text = req.body.text;
    }
    const updatePostIt = await postIt.save();
    res.json(updatePostIt);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deletePostIt = async (req, res) => {
  try {
    const postIt = await PostIt.findById(req.params.id);
    if (postIt == null) {
      res.status(404).json({ error: "Post it not found" });
    }
    await postIt.deleteOne();
    res.json({ message: "Delete post it" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
