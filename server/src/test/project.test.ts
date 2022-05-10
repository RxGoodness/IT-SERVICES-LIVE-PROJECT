const request = require("supertest");
import projectDb from "../models/project";
const app = require("../app");

const projectOne = {
  name: "test",
  overview: "hello",
  editor: "hey",
};

beforeEach(async () => {
  await projectDb.deleteMany();
});

describe("project creation", () => {
  it("check for creation", async () => {
    const response = await request(app)
      .post("/projects")
      .send(projectOne)
      .expect(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("overview");
    expect(response.body.name).toEqual("test");
  });

  it("check for creation if editor is omitted", async () => {
    const response = await request(app)
      .post("/projects")
      .send({
        name: "test",
        overview: "hello",
      })
      .expect(400);
    expect(response.body[0]).toHaveProperty("message");
  });
});

describe("project deleted", () => {
  it("check for deletion", async () => {
    const response = await request(app).post("/projects").send(projectOne);
    const deleteBody = await request(app)
      .delete(`/projects/${response.body._id}`)
      .expect(200);
    expect(deleteBody.body).toEqual({ message: "successfully deleted" });
  });

  it("check for right message when trying to delete project that has been deleted", async () => {
    const response = await request(app).post("/projects").send(projectOne);
    await request(app).delete(`/projects/${response.body._id}`);
    const deleteBody = await request(app)
      .delete(`/projects/${response.body._id}`)
      .expect(404);
    expect(deleteBody.body).toEqual({ message: "Already deleted" });
  });
});

describe("project update", () => {
  it("check for all field update ", async () => {
    const response = await request(app).post("/projects").send(projectOne);
    const updatedBody = await request(app)
      .put(`/projects/${response.body._id}`)
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
    expect(updated.body[0]).toHaveProperty("message");
  });
});
