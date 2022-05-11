import express from 'express';
import { createBlog, editBlog, deleteBlog, viewBlog, viewBlogs, commentPost} from '../controllers/blogPost';
const blogRouter = express.Router();

blogRouter.get("/blog/:id", viewBlog)
blogRouter.get("/blog", viewBlogs)
blogRouter.post("/blog", createBlog)
blogRouter.post("/blog/comment/:id/", commentPost)
blogRouter.put("/blog/:id", editBlog)
blogRouter.delete("/blog/:id", deleteBlog)

export default blogRouter;