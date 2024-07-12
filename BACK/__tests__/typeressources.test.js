// __tests__/typeResourceRoutes.test.js
import request from "supertest";
import app from "../app"; // Ensure the path is correct

// Mock Prisma Client
jest.mock("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Type Resource Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of type resources", async () => {
    const mockTypesResource = [
      { idTypeResource: 1, labelTypeResource: "Article" },
      { idTypeResource: 2, labelTypeResource: "Video" },
    ];
    prisma.typeResource.findMany.mockResolvedValue(mockTypesResource);

    const response = await request(app).get("/typeResources");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTypesResource);
  });

  it("should create a new type resource", async () => {
    const mockTypeResource = { idTypeResource: 3, labelTypeResource: "Podcast" };
    prisma.typeResource.create.mockResolvedValue(mockTypeResource);

    const response = await request(app)
      .post("/typeResources/createTypeResource")
      .send({ labelTypeResource: "Podcast" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTypeResource);
  });

  it("should delete a type resource", async () => {
    const mockTypeResource = { idTypeResource: 1, labelTypeResource: "Article" };
    prisma.typeResource.delete.mockResolvedValue(mockTypeResource);

    const response = await request(app)
      .delete("/typeResources/deleteTypeResource")
      .send({ idTypeResource: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTypeResource);
  });

  it("should update a type resource", async () => {
    const mockTypeResource = { idTypeResource: 2, labelTypeResource: "Updated Video" };
    prisma.typeResource.update.mockResolvedValue(mockTypeResource);

    const response = await request(app)
      .put("/typeResources/updateTypeResource")
      .send({ idTypeResource: 2, labelTypeResource: "Updated Video" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTypeResource);
  });
});
