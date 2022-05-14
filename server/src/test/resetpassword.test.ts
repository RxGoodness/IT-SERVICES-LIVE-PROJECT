import request from "supertest";
import app from "../app";

describe("enter emil for password reset", () => {
  it("enter email", async () => {
    const response = await request(app)
      .post("/reset-password/enter-email")
      .send({
        email: "example@email.com",
      })
      .expect(400);
  });
});
