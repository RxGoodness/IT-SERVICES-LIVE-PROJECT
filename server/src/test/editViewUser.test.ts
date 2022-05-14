import request from "supertest";
import app from "../app";

describe("View A User Profile", () => {
    it("This should view a user profile", async () => {
        const response = await request(app).get("/profile/view")
            .query({ email: 'nk@gmail.com' })
        expect(response.body).toHaveProperty("firstName");
        expect(response.body).toHaveProperty("lastName");
        expect(response.body).toHaveProperty("email");
        expect(response.status).toBe(200)
    })
})

describe("Edit a User Profile", () => {
    it("This should edit and update user profile", async () => {
        const response = await request(app).put("/profile/edit")
            .query({
                email: "nk@gmail.com"
            })
            .send({
                "firstName": "Ezzy",
                "lastName": "David",
                "email": "nk@gmail.com"
            })
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: "Profile updated successfully!" })
    })
})
