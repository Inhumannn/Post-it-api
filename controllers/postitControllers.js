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
