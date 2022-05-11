import request from "supertest";
const app = require("../app");

describe("Post all quotes", () => {
    it("post all quotes", async () => {
        const response = await request(app).post("/quotes").send({
            "name": "test",
            "quote": "hello",
            "technologies": "hey",
            "projectDescription": "hjdjkshdkfhjdsh",
            "clientEmail": "jrnjiw@gmail.com"
        })
        expect(response.status).toBe(201)
        expect(response.body).toEqual({ message: "quotes sent successfully"})
    })
})