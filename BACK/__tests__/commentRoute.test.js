// __tests__/routeComment.test.js
import request from "supertest";
import app from "../app"; // Ensure the path is correct

// Mock Prisma Client
jest.mock("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Comment Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of comments", async () => {
    const mockComments = [
      { idComment: 1, content: "Test comment", author: {}, resource: {}, replies: [], parentComment: null },
    ];
    prisma.comment.findMany.mockResolvedValue(mockComments);

    const response = await request(app).get("/comments");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComments);
  });

  it("should create a new comment", async () => {
    const mockComment = { idComment: 1, content: "New Comment" };
    prisma.comment.create.mockResolvedValue(mockComment);

    const response = await request(app)
      .post("/comments/createComment")
      .send({ content: "New Comment", resourceId: 1, authorId: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComment);
  });

  it("should delete a comment", async () => {
    const mockComment = { idComment: 1, content: "Comment to be deleted" };
    prisma.comment.delete.mockResolvedValue(mockComment);

    const response = await request(app)
      .delete("/comments/deleteComment")
      .send({ idComment: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComment);
  });

  it("should update a comment", async () => {
    const mockComment = { idComment: 1, content: "Updated Comment" };
    prisma.comment.update.mockResolvedValue(mockComment);

    const response = await request(app)
      .put("/comments/updateComment")
      .send({ idComment: 1, content: "Updated Comment" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComment);
  });

  it("should get a comment by id", async () => {
    const mockComment = { idComment: 1, content: "Comment by ID" };
    prisma.comment.findUnique.mockResolvedValue(mockComment);

    const response = await request(app)
      .get("/comments/getCommentById")
      .send({ idComment: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComment);
  });
});
