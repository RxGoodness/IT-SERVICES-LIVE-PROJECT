import { Post } from "../models/blogModel";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";
import { MongooseError } from 'mongoose'

//CREATE POST
const createBlog = asyncHandler(
  async (req: Request, res: Response) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      message: Joi.string().required(),
      summary: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      comment: Joi.string(),
      username: Joi.string()
    });

    //Validate req,body
    await schema.validateAsync(req.body);

    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  }
)


//UPDATE POST
const editBlog = asyncHandler(
  async (req: Request, res: Response) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      message: Joi.string().required(),
      summary: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      username: Joi.string()
    });

    //Validate Schema
    await schema.validateAsync(req.body);

    //Get Post from database
    const post = await Post.findOne({ id: req.params.id });

    if (post) {
      const updatedPost = await Post.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      res.status(401);
      throw new Error("You can update only your post!");
    }
  }
)

//DELETE POST
const deleteBlog = asyncHandler(
  async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(400);
        throw new Error("Post not deleted");
      }
    } else {
      res.status(400);
      throw new Error("Blog post not found!");
    }
  }
)


//GET POST
const viewBlog = asyncHandler(
  async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  }
)


//GET ALL POSTS
const viewBlogs = asyncHandler(
  async (req: Request, res: Response) => {
    const userTitle = req.query.title;
    const catName = req.query.category;
    let posts;
    if (userTitle) {
      posts = await Post.find({ userTitle });
    } else if (catName) {
      posts = await Post.find({
        category: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  }
)


const commentPost = asyncHandler(
  async (req: Request, res: Response) => {
    const schema = Joi.object().keys({
      comments: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        comment: Joi.string().required(),
      })
    });

    await schema.validateAsync(req.body);
    const post = await Post.findOne({
      _id: req.params.id
    });

    if (post) {
      const commentedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push:
          {
            "comments": {
              name: req.body.comments.name,
              email: req.body.comments.email,
              comment: req.body.comments.comment
            }
          }

        },
        { new: true }
      );
      res.status(200).json(commentedPost);
    } else {
      res.status(401);
      throw new Error("comment not successful")
    }
  }
)

export { createBlog, deleteBlog, editBlog, viewBlog, viewBlogs, commentPost };
