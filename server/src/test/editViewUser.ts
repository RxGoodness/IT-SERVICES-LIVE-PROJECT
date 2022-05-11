import request from "supertest";
const app = require("../app");


describe("Edit User Profile", () => {
    it("This should edit and update user profile", async () => {
        const response = await request(app).put("/edit-profile/edit")
        .query({
            email: "nk@gmail.com"
        })
        .send({
            "firstname": "Ezzy",
            "lastname": "David",
            "email": "nk@gmail.com",
            "location": "Nigeria",
            "about": "Cool",
            "imageUrl": "image.jpg"
         })
        expect(response.status).toBe(200)
        expect(response.body).toEqual({message: "Profile updated successfully!"})
    })
})


describe("View A User Profile", () => {
     it("This should view a user profile", async () => {
         const response = await request(app).get("/view-profile/view")
         .query({email: 'nk@gmail.com'})
         expect(response.body).toHaveProperty("firstname");
         expect(response.body).toHaveProperty("lastname");
         expect(response.body).toHaveProperty("email");
         expect(response.body).toHaveProperty("location");
         expect(response.body).toHaveProperty("about");
         expect(response.body).toHaveProperty("imageUrl");
         expect(response.status).toBe(200)
     })
})