import Joi from "joi";

const createSchema = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    summary: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    comment: Joi.string(),
    username:Joi.string()
  });


  const editSchema = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    summary: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    username:Joi.string()
  });


  const commentSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(), 
        comment: Joi.string().required(), 
      })
    

export {
    createSchema,
    editSchema,
    commentSchema
}