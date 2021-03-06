const request = require("supertest");
import projectDb from "../models/project";
import app from "../app";
import ownerDb from "../models/admin.schema";
// import mongoose from "mongoose";
// const ownerId = new mongoose.Types.ObjectId()

let token:string;

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
  editor: "hey"
};
beforeEach(async () => {
  await projectDb.deleteMany();
  await ownerDb.deleteMany();
});

beforeAll(async () => {
  const ownerResponse = await request(app).post("/admin/create").send(owner);
  token = ownerResponse.body.token
});


describe("project creation", () => {
  it("check for creation of project without authorization", async () => {
    await request(app).post("/projects").send(projectOne).expect(401);
  });
  it("check for creation", async () => {
    // const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send(projectOne)
      .expect(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("overview");
    expect(response.body.name).toEqual("test");
  });
  it("check for creation if editor is omitted", async () => {
    // const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
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
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send(projectOne);
    const deleteBody = await request(app)
      .delete(`/projects/${response.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(deleteBody.body).toEqual({ message: "successfully deleted" });
  });
});
describe("project deletion more than once", () => {
  it("check for right message when trying to delete project that has been deleted", async () => {
    // const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send(projectOne);
    await request(app)
      .delete(`/projects/${response.body._id}`)
      .set("Authorization", `Bearer ${token}`);
    const deleteBody = await request(app)
      .delete(`/projects/${response.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
    expect(deleteBody.body).toEqual({ msg: "Not Found" });
  });
});
describe("project update", () => {
  it("check for all field update ", async () => {
    // const ownerResponse = await request(app).post("/admin/create").send(owner);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send(projectOne);
    const updatedBody = await request(app)
      .put(`/projects/${response.body._id}`)
      .set("Authorization", `Bearer ${token}`)
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


describe("get all project", () => {
  it("it checked for all get project", async () => {
    const response = await request(app).get("/projects")
    .set("Authorization", `Bearer ${token}`);
    expect(response.body).toHaveLength(0);
    expect(response.status).toBe(200);
  })
}) 

describe("get a single project", () => {
  it("it checked for just a get project", async () => {
    const response = await request(app).get("/projects/jhh")
    .set("Authorization", `Bearer ${token}`);
    // expect(response.body.params.id).toHaveLength(0);
    expect(response.status).toBe(400);
  })
})
