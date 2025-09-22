const mongoose = require("mongoose");

const postitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
  },
});

module.exports = mongoose.model("PostIt", postitSchema);
