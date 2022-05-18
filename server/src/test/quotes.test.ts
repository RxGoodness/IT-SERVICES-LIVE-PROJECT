import request from "supertest";
import app from "../app";

describe("Post all quotes", () => {
  it("post all quotes", async () => {
    const response = await request(app).post("/quotes").send({
      projectName: "testing app",
      email: "example@gmail.com",
      summary: "A testing platform for or employees",
    });
    expect(response.status).toBe(201);
    // expect(response.body).toEqual({ message: "quotes sent successfully" })
  });
});
