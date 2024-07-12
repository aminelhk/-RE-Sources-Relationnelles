// __tests__/role.test.js
import request from "supertest";
import app from "../app"; // Ensure the path is correct

// Mock Prisma Client
jest.mock("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Role Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of roles", async () => {
    const mockRoles = [
      { idRole: 1, labelRole: "Admin" },
      { idRole: 2, labelRole: "User" },
    ];
    prisma.role.findMany.mockResolvedValue(mockRoles);

    const response = await request(app).get("/roles");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRoles);
  });

  it("should create a new role", async () => {
    const mockRole = { idRole: 3, labelRole: "Editor" };
    prisma.role.create.mockResolvedValue(mockRole);

    const response = await request(app)
      .post("/roles/createRole")
      .send({ idRole: 3, labelRole: "Editor" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRole);
  });

  it("should delete a role", async () => {
    const mockRole = { idRole: 1, labelRole: "Admin" };
    prisma.role.delete.mockResolvedValue(mockRole);

    const response = await request(app)
      .delete("/roles/deleteRole")
      .send({ idRole: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRole);
  });

  it("should update a role", async () => {
    const mockRole = { idRole: 2, labelRole: "Updated User" };
    prisma.role.update.mockResolvedValue(mockRole);

    const response = await request(app)
      .put("/roles/updateRole")
      .send({ idRole: 2, labelRole: "Updated User" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRole);
  });
});
