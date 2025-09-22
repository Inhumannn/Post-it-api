const {
  getAllPostIt,
  createPostIt,
  updatePostIt,
} = require("./postitControllers");
const PostIt = require("../models/postitModels");
jest.mock("../models/postitModels.js");

describe("Post-It Controllers", () => {
  let req, res;
  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("getAllPostIt", () => {
    it("should return all post it", async () => {
      const mockPostIt = [
        {
          title: "PostIt 1",
          text: "lorem12",
        },
        {
          title: "PostIt 2",
          text: "lorem12",
        },
      ];
      PostIt.find.mockResolvedValue(mockPostIt);
      await getAllPostIt(req, res);
      expect(PostIt.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockPostIt);
    });
    it("should handle errors", async () => {
      PostIt.find.mockRejectedValue(new Error("Database error"));
      await getAllPostIt(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });
  describe("createNewPostIt", () => {
    it("should create new post it", async () => {
      const postItData = { title: "New Post It", text: "Lorem12" };
      const mockPostIt = { _id: "1", ...postItData };
      req.body = postItData;

      const mockSave = jest.fn().mockResolvedValue(mockPostIt);
      PostIt.mockImplementation(() => ({ save: mockSave }));
      await createPostIt(req, res);
      expect(PostIt).toHaveBeenCalledWith(postItData);
      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockPostIt);
    });
    it("should handle validation errors", async () => {
      req.body = { title: "New Post It", text: "Lorem12" };
      const mockSave = jest
        .fn()
        .mockRejectedValue(new Error("Validation error"));
      PostIt.mockImplementation(() => ({ save: mockSave }));
      await createPostIt(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Validation error" });
    });
  });
  describe("updatePostIt", () => {
    it("should update post it", async () => {
      const mockPostIt = {
        _id: "1",
        title: "old post it",
        text: "lorem12",
        save: jest.fn().mockResolvedValue({
          _id: "1",
          title: "update post it",
          text: "lorem13",
        }),
      };
      req.params.id = "1";
      req.body = { title: "update post it", text: "lorem13" };
      PostIt.findById.mockResolvedValue(mockPostIt);
      await updatePostIt(req, res);
      expect(PostIt.findById).toHaveBeenCalledWith("1");
      expect(mockPostIt.title).toBe("update post it");
      expect(mockPostIt.text).toBe("lorem13");
      expect(mockPostIt.save).toHaveBeenCalled();
    });
    it("should return 404 when post it not found", async () => {
      req.params.id = "1";
      PostIt.findById.mockResolvedValue(null);
      await updatePostIt(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Post it not found" });
    });
    it("should handle save errors", async () => {
      const mockPostIt = {
        save: jest.fn().mockRejectedValue(new Error("Save error")),
      };
      req.params.id = "1";
      req.body = { title: "post it to be updated", text: "lorem13" };
      PostIt.findById.mockResolvedValue(mockPostIt);
      await updatePostIt(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Save error" });
    });
  });
});
