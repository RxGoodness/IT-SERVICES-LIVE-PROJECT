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
const blogRouter = express.Router();

blogRouter.get("/latest", latestPost);
blogRouter.get("/top", topBlogPost);

blogRouter.get("/:id", viewBlog);
blogRouter.get("/", viewBlogs);
blogRouter.post("/", createBlog);
blogRouter.post("/comment/:id/", commentPost);
blogRouter.put("/:id", editBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
