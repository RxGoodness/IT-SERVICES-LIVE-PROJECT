import { Post } from "../models/blogModel";
import { Request, Response } from "express";
import {createSchema, editSchema , commentSchema} from "../config/blogSchema"
import asyncHandler from "express-async-handler"

//CREATE POST
const createBlog =  asyncHandler (async (req: Request, res: Response) => {

  const validSchema = createSchema.validate(req.body);
  if (validSchema.error) {
    res.status(400).send(validSchema.error.details[0].message);
  }


  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
const editBlog = asyncHandler (async (req: Request, res: Response) => {
  try{
  
  const validSchema = editSchema.validate(req.body);
  if (validSchema.error) {
    res.status(400).send(validSchema.error.details[0].message);
  }
  
    const post = await Post.findOne({id: req.params.id});
    console.log(post.id)
    

    if (post) {
      try {
        const updatedPost = await Post.findOneAndUpdate(
          {id: req.params.id},
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  }
    catch (err) {
      res.status(500).json(err);
    }
  })

  
//DELETE POST
const deleteBlog = asyncHandler (async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Blogpost not found!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
const viewBlog = asyncHandler ( async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
const viewBlogs = asyncHandler ( async (req: Request, res: Response) => {
  const userTitle = req.query.title;
  const catName = req.query.category;
  try {
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
  } catch (err) {
    res.status(500).json(err);
  }
});

const commentPost =asyncHandler( async (req: Request, res: Response) => {


const validSchema = commentSchema.validate(req.body);

if (validSchema.error) {
  res.status(400).send(validSchema.error.details[0].message);
}

try {
  const post = await Post.findOne({
    _id: req.params.id});
  console.log(post)
  if (post) {
    try {
      const commentedPost = await Post.findOneAndUpdate(
        {_id: req.params.id},
        {
          $push: 
          {"comments": {name: req.body.name, 
            email:req.body.email,
            comment:req.body.comment
          }}
          
        },
        { new: true }
      );
      console.log(post)

      res.status(200).json(commentedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("comment not succesful");
  }
} catch (err) {
  res.status(500).json(err);
}
});

export { createBlog, deleteBlog, editBlog, viewBlog, viewBlogs, commentPost };