import { Post } from "../models/blogModel";
import { Request, Response } from "express";
import Joi from "joi";

//CREATE POST
const createBlog = async (req: Request, res: Response) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    summary: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    comment: Joi.string(),
    username:Joi.string()
  });
  const validSchema = schema.validate(req.body);
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
};

//UPDATE POST
const editBlog = async (req: Request, res: Response) => {
  try{
 
  const schema = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    summary: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    username:Joi.string()
  });
  
  const validSchema = schema.validate(req.body);
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
  }

  
//DELETE POST
const deleteBlog = async (req: Request, res: Response) => {
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
};

//GET POST
const viewBlog = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL POSTS
const viewBlogs = async (req: Request, res: Response) => {
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
};

const commentPost = async (req: Request, res: Response) => {
const schema = Joi.object().keys({
  comments: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(), 
      comment: Joi.string().required(), 
    })
  })

const validSchema = schema.validate(req.body);

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
          {"comments": {name: req.body.comments.name, 
            email:req.body.comments.email,
            comment:req.body.comments.comment
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
};

export { createBlog, deleteBlog, editBlog, viewBlog, viewBlogs, commentPost };