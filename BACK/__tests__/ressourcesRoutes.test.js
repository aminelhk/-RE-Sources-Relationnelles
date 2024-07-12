// __tests__/resourcesComment.test.js
import request from "supertest";
import app from "../src/app"; // Ensure the path is correct
import path from "path";

// Mock Prisma Client
jest.mock("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Resource Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of resources", async () => {
    const mockResources = [
      { idResource: 1, title: "Test Resource", createdAt: new Date().toISOString() },
    ];
    prisma.resource.findMany.mockResolvedValue(mockResources);

    const response = await request(app).get("/resources");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idResource: 1,
          title: "Test Resource",
        }),
      ])
    );
  });

  it("should create a new resource", async () => {
    const mockResource = { idResource: 1, title: "New Resource" };
    prisma.resource.create.mockResolvedValue(mockResource);

    const response = await request(app)
      .post("/resources/createResource")
      .field("resource", JSON.stringify({ title: "New Resource", resourceId: 1, authorId: 1 }))
      .attach("file", path.resolve(__dirname, "testFile.txt"));
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResource);
  });

  it("should delete a resource", async () => {
    const mockResource = { idResource: 1, title: "Resource to be deleted" };
    prisma.resource.delete.mockResolvedValue(mockResource);

    const response = await request(app)
      .delete("/resources/deleteResource")
      .send({ idResource: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResource);
  });

  it("should update a resource", async () => {
    const mockResource = { idResource: 1, title: "Updated Resource" };
    prisma.resource.update.mockResolvedValue(mockResource);

    const response = await request(app)
      .put("/resources/updateResource")
      .field("resource", JSON.stringify({ idResource: 1, title: "Updated Resource", resourceId: 1, authorId: 1 }))
      .attach("file", path.resolve(__dirname, "testFile.txt"));

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResource);
  });

  it("should find a resource by ID", async () => {
    const mockResource = { idResource: 1, title: "Resource by ID" };
    prisma.resource.findUnique.mockResolvedValue(mockResource);

    const response = await request(app)
      .get("/resources/findOneResourceById")
      .send({ idResource: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResource);
  });

  it("should update the archive status of a resource", async () => {
    const mockResource = { idResource: 1, isArchived: true };
    prisma.resource.update.mockResolvedValue(mockResource);

    const response = await request(app)
      .put("/resources/updateArchiveResource")
      .send({ idResource: 1, isArchived: true });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResource);
  });

  it("should update the exploit status of a resource", async () => {
    const mockResource = { idResource: 1, isExploited: true };
    prisma.resource.update.mockResolvedValue(mockResource);

    const response = await request(app)
      .put("/resources/updateExploitResource")
      .send({ idResource: 1, isExploited: true });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResource);
  });

  it("should update the favorite status of a resource", async () => {
    const mockResource = { idResource: 1, isFavorite: true };
    prisma.resource.update.mockResolvedValue(mockResource);

    const response = await request(app)
      .put("/resources/updateFavoriteResource")
      .send({ idResource: 1, isFavorite: true });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResource);
  });

  it("should share a resource", async () => {
    const mockShare = { userId: 1, resourceId: 1 };
    prisma.share.create.mockResolvedValue(mockShare);

    const response = await request(app)
      .post("/resources/shareResource")
      .send({ userId: 1, resourceId: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockShare);
  });
});
