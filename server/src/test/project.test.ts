const request = require("supertest");
import projectDb from "../models/project";
import app from "../app";
import ownerDb from "../models/admin.schema";
// import mongoose from "mongoose";

// const ownerId = new mongoose.Types.ObjectId()

const owner = {
  firstName: "ken",
  lastName: "osagie",
  email: "kenosagie88@gmail.com",
  password: "12345678Osagie@",
  confirmPassword: "12345678Osagie@",
  phone: "08058097503",
};

const projectOne = {
  name: "test",
  overview: "hello",
  editor: "hey",
};

beforeEach(async () => {
  await projectDb.deleteMany();
  await ownerDb.deleteMany();
});

describe("project creation", () => {
  it("check for creation of project without authorization", async () => {
    await request(app).post("/projects").send(projectOne).expect(401);
  });

  it("check for creation", async () => {
    const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${ownerResponse.body.token}`)
      .send(projectOne)
      .expect(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("overview");
    expect(response.body.name).toEqual("test");
  });

  it("check for creation if editor is omitted", async () => {
    const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${ownerResponse.body.token}`)
      .send({
        name: "test",
        overview: "hello",
      })
      .expect(400);
    expect(response.body).toHaveProperty("msg");
  });
});

describe("project deleted", () => {
  it("check for deletion", async () => {
    const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${ownerResponse.body.token}`)
      .send(projectOne);
    const deleteBody = await request(app)
      .delete(`/projects/${response.body._id}`)
      .set("Authorization", `Bearer ${ownerResponse.body.token}`)
      .expect(200);
    expect(deleteBody.body).toEqual({ message: "successfully deleted" });
  });
});

describe("project deletion more than once", () => {
  it("check for right message when trying to delete project that has been deleted", async () => {
    const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${ownerResponse.body.token}`)
      .send(projectOne);
    await request(app)
      .delete(`/projects/${response.body._id}`)
      .set("Authorization", `Bearer ${ownerResponse.body.token}`);
    const deleteBody = await request(app)
      .delete(`/projects/${response.body._id}`)
      .set("Authorization", `Bearer ${ownerResponse.body.token}`)
      .expect(404);
    expect(deleteBody.body).toEqual({ message: "Already deleted" });
  });
});

describe("project update", () => {
  it("check for all field update ", async () => {
    const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${ownerResponse.body.token}`)
      .send(projectOne);
    const updatedBody = await request(app)
      .put(`/projects/${response.body._id}`)
      .set("Authorization", `Bearer ${ownerResponse.body.token}`)
      .send({
        name: "testUpdate",
        overview: "helloUpdate",
        editor: "heyUpdate",
      })
      .expect(200);
    expect(updatedBody.body.data).toMatchObject({
      name: "testUpdate",
      overview: "helloUpdate",
      editor: "heyUpdate",
    });
  });

  it("check for some update", async () => {
    const response = await request(app).post("/projects").send(projectOne);
    const updated = await request(app)
      .put(`/projects/${response.body._id}`)
      .send({
        name: "testUpdate",
      })
      .expect(400);
    expect(updated.body).toHaveProperty("msg");
  });
});
