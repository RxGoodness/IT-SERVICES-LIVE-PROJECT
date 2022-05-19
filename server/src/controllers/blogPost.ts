import { Post } from "../models/blogModel";
import { Request, Response } from "express";
import { createSchema, editSchema, commentSchema } from "../config/blogSchema";
import asyncHandler from "express-async-handler";
import Activity from "../models/activity";


//CREATE POST
const createBlog = asyncHandler(async (req: Request, res: Response) => {
  await createSchema.validateAsync(req.body);
  const newPost = new Post(req.body);
  const savedPost = await newPost.save();

  //RECORD ACTIVITY
  const newActivity = new Activity(
    {
    message: `A blog post was created succesfully`,
    author: 'Admin',
    authorActivityTitleOrName: savedPost.title,
    authorActivityID:savedPost._id
    }
   )

 const savedActivity = await newActivity.save();


  res.status(200).json(savedPost);
});

//UPDATE POST
const editBlog = asyncHandler(async (req: Request, res: Response) => {
  await editSchema.validateAsync(req.body);
  const post = await Post.findOne({ id: req.params.id });

  if (post) {
    const updatedPost = await Post.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `A blog post was updated succesfully`,
  author: 'Admin',
  authorActivityTitleOrName: updatedPost.title,
  authorActivityID:updatedPost._id
  }
 )
const savedActivity = await newActivity.save();


    res.status(200).json(updatedPost);
  } else {
    res.status(401).json("You can update only your post!");
  }
});

//DELETE POST
const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      try {

        //RECORD ACTIVITY
        const newActivity = new Activity(
          {
          message: `A blog post was deleted succesfully`,
          author: 'Admin',
          authorActivityTitleOrName: post.title,
          authorActivityID: post._id
          }
         ) 
       const savedActivity = await newActivity.save();
      

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
const viewBlog = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `A blog post was viewed succesfully`,
  authorActivityTitleOrName: post.title,
  authorActivityID: post._id
  }
 ) 
const savedActivity = await newActivity.save();


    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("Error getting BlogPost");
  }
});

//GET ALL POSTS
const viewBlogs = asyncHandler(async (req: Request, res: Response) => {
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

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `All blog posts were viewed succesfully`,
   }
 ) 
const savedActivity = await newActivity.save();


    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

const commentPost = asyncHandler(async (req: Request, res: Response) => {
  await commentSchema.validateAsync(req.body);

  const post = await Post.findOne({
    _id: req.params.id,
  });
  if (post) {
    const commentedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment,
          },
        },
      },
      { new: true }
    );
    console.log(post);

    //RECORD ACTIVITY
    const newActivity = new Activity(
      {
      message: `A comment was made on a blog post was succesfully`,
      authorActivityTitleOrName: post.title,
      authorActivityID: post._id
      }
     ) 
   const savedActivity = await newActivity.save();

    res.status(200).json(commentedPost);
  } else {
    res.status(401).json("error commenting on post");
  }
});

const latestPost = asyncHandler(async (req: Request, res: Response) => {
  const latest = await Post.find().sort({ createdAt: -1 }).limit(6);

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `The latest blogpost was viewed succesfully`,
   }
 ) 
const savedActivity = await newActivity.save();

  res.status(200).json(latest);
});

const topBlogPost = asyncHandler(async (req: Request, res: Response) => {
  const topPost = await Post.find().sort({ comments: -1 }).limit(6);

  //RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `The latest blogpost was viewed succesfully`,
   }
 ) 
const savedActivity = await newActivity.save();

  res.status(200).json(topPost);
});

export {
  createBlog,
  deleteBlog,
  editBlog,
  viewBlog,
  viewBlogs,
  commentPost,
  latestPost,
  topBlogPost,
};
