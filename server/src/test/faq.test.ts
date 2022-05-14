import request from "supertest";
const app = require("../app");
 

// request(app).post("/yourpostendpoint.send({obj}).expect(201)
describe("get all faqs",  () => {
     it("gets all faqs from the db", async() => {
        const response = await request(app).get("/faqs")
        expect(response.body).toHaveLength(0);
        expect(response.status).toBe(200)
     })
})

//post, create questions
describe("create new faq entry", () => {
    it('creates a new faq entry', async () => {
        const response = await request(app).post("/newfaq").send({
            "questions": "How can I prove my program works?",
            "answers": "write tests for your program",
        }).expect(201)
        
    })
})
// 

describe("it edits an existing faq entry",() => {
    it("edits an existing faq entry",async () => {
        const response = await request(app).put("/editfaq/6").send({
            "questions": "this should alter the question"
        })
        expect(response.statusCode).toBe(200)
       
        
    })
})

//
describe("delete faq", () => {
    it('delete the specified faq entry', async () => {
        const response = await request(app).delete("/deletefaq/:id").send().expect(404)
        expect(response.body).toEqual({"message": "Requested ID not found"})
    })
})