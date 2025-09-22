const express = require("express");
const router = express.Router();

const postItController = require("../controllers/postitControllers");

router.get("/", postItController.getAllPostIt);
router.post("/", postItController.createPostIt);
router.patch("/", postItController.updatePostIt);
router.delete("/", postItController.deletePostIt);

module.exports = router;
