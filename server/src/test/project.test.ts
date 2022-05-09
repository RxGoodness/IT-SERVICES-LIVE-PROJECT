const request = require("supertest")
const Project = require("../models/project")
const app = require("../app");

describe("project created", () => {
    it('post a new project', async () => {
        const response = await request(app).post("/projects").send({
            "name": "test",
            "overview": "hello",
            "editor": "hey"
        }).expect(201)
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("overview");
        expect(response.body.name).toEqual("test");
    })
})
