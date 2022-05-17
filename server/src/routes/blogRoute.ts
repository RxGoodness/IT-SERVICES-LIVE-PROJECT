import express from "express";
import {
  createBlog,
  editBlog,
  deleteBlog,
  viewBlog,
  viewBlogs,
  commentPost,
  latestPost,
  topBlogPost,
} from "../controllers/blogPost";
import protect from "../middlewares/protectRoute";
const blogRouter = express.Router();

blogRouter.get("/latest", latestPost);
blogRouter.get("/top", topBlogPost);
blogRouter.get("/:id", viewBlog);
blogRouter.get("/", viewBlogs);
blogRouter.post("/create", protect, createBlog);
blogRouter.post("/comment/:id/", protect, commentPost);
blogRouter.put("/:id", protect, editBlog);
blogRouter.delete("/:id", protect, deleteBlog);

export default blogRouter;
