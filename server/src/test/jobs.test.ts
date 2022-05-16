import request from "supertest"
import app from "../app";


describe("Get all Jobs", () => {
    it('get all jobs', async () => {
        const response = await request(app).get("/jobs")
        // expect(response.body).toHaveLength(0)
        expect(response.status).toBe(404)
    })
})

