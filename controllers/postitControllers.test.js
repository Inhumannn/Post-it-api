const { getAllPostIt } = require("./postitControllers");
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
});
