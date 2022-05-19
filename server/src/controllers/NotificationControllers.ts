import { Request, Response } from 'express';
import Joi from "joi";
import asyncHandler from "express-async-handler";
import ContactMessages from '../models/contactFormSchema'
import Activity from '../models/activity';

const contactMessage = asyncHandler(
    async (req: Request, res: Response) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            message: Joi.string().required()
        })

        await schema.validateAsync(req.body);


        try {
            const { name, email, message } = req.body;
            const postedMessage = {
                name,
                email,
                message
            }

       const myMessage = await ContactMessages.create(postedMessage);

           //RECORD ACTIVITY
            const newActivity = new Activity(
                {
                message: `A contact message was posted succesfully`,
                author: 'Admin',
                authorActivityTitleOrName: myMessage.name,
                authorActivityID:myMessage._id
                }
               )
             const savedActivity = await newActivity.save();
      

            res.status(200).json({
                message: "Thank you for contacting us"
                // data
            })

        } catch (error) {
            res.status(400).json({ msg: "Message not sent" })
        }
    }
)


const deleteNotification = asyncHandler(
    async (req: Request, res: Response) => {
        console.log(req.params.id)
        const toBeDeletedNotification = await ContactMessages.findById({ _id: req.params.id })
        const deletedNotification = await ContactMessages.findByIdAndRemove({ _id: req.params.id })
        if (!deletedNotification) {
            res.status(400).json({ msg: "Message not found in database" })
        } else {

            const newActivity = new Activity(
                {
                message: `A contact message was deleted succesfully`,
                author: 'Admin',
                authorActivityTitleOrName: toBeDeletedNotification.name,
                authorActivityID:toBeDeletedNotification._id
                }
               )
           
             const savedActivity = await newActivity.save();

            res.status(200).json({ message: "Notification deleted Successfully" })
        }
    }
)


const viewNotifications = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const params = req.query;
            const notifications = await ContactMessages.find(params)

            const newActivity = new Activity(
                {
                message: `Contact message were viewed succesfully`,
                }
               )
             const savedActivity = await newActivity.save();
           
            
            res.status(200).json(notifications)
        } catch (error) {
            res.status(400).json({ msg: "Message not found" })
        }
    }
)


export { contactMessage, deleteNotification, viewNotifications }
