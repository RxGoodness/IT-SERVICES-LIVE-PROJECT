import request from "supertest";
const app = require("../app");

describe("change password", () => {
  it("enter your password", async () => {
    await request(app)
      .post("/change_password")
      .send({
        currentPassword: "Gandalf1993#",
        newPassword: "Gandalf93#",
        confirmNewPassword:"Gandalf93#"
      })
      .expect(200);
  });
});