import request from "supertest";
import app from "../src/app"; // Votre application Express configurée

describe("Tests des routes API", () => {
  it("devrait retourner une réponse 200 pour /api/users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
  });

  it("devrait retourner une réponse JSON pour /api/users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.type).toMatch(/json/);
  });

  // Ajoutez d'autres tests selon les endpoints que vous souhaitez tester
});
