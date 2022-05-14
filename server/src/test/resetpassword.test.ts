import request from "supertest";
const app = require("../app");

describe("enter emil for password reset", () => {
  it("enter email", async () => {
    const response = await request(app)
      .post("/reset-password/enter-email")
      .send({
        email: "example@email.com",
      })
      .expect(400);

    // console.log(response);
  });

  it("change password", async () => {
    const response = await request(app)
      .post("/reset-password/627b77a28fdb119e19269ec8/123456")
      .send({
        password: "majorasMASK@1",
        reEnterPassword: "majorasMASK@1",
      })
      .expect(200);
    console.log(response.body);
  });
});
