const PostIt = require("../models/postitModels");

exports.getAllPostIt = async (req, res) => {
  try {
    const postIts = await PostIt.find();
    res.status(200).json(postIts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
