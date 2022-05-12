import {Request, Response} from 'express';
import Joi from "joi";
import ContactMessages from '../models/contactFormSchema'

const contactMessage = async (req:Request, res: Response) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        message: Joi.string().required()
    })

    const validSchema = schema.validate(req.body);
     
    if(validSchema.error){
        return res.status(400).json(validSchema.error.details[0].message)
    }

    try{
        const {name, email, message} = req.body;
        const postedMessage = {
            name,
            email,
            message
        }

        await ContactMessages.create(postedMessage);

     return res.status(200).json({message:"Thank you for contacting us"
        // data
    })
    
    
    }catch (error){
       return console.log(error)
    }
}

const deleteNotification = async (req:Request, res:Response) => {
    console.log(req.params.id)
  try{
      
      const deletedNotification = await ContactMessages.findByIdAndRemove({_id: req.params.id})

      if(!deletedNotification){
          return res.status(404).send("Message not found in database")
        }else{
            return res.status(200).json({message:"Notification deleted Succesfully"})
        }
    }catch(error){
        return res.status(500).json({error})
    }
}

const viewNotifications = async (req:Request, res:Response) => {
    try{
        const params = req.query;
        const notifications = await ContactMessages.find(params)
        return res.send(notifications)
    }catch(error){
        return res.status(500).json(error)
    }
  
}

export {contactMessage, deleteNotification, viewNotifications}

