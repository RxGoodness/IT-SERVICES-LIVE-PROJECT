import { Request, Response } from 'express';
import Joi from "joi";
import asyncHandler from "express-async-handler";
import ContactMessages from '../models/contactFormSchema'

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

            await ContactMessages.create(postedMessage);

            res.status(200).json({
                message: "Thank you for contacting us"
                // data
            })

        } catch (error) {
            res.status(400);
            throw new Error("Message not sent")
        }
    }
)


const deleteNotification = asyncHandler(
    async (req: Request, res: Response) => {
        console.log(req.params.id)
        const deletedNotification = await ContactMessages.findByIdAndRemove({ _id: req.params.id })

        if (!deletedNotification) {
            res.status(400);
            throw new Error("Message not found in database")
        } else {
            res.status(200).json({ message: "Notification deleted Successfully" })
        }
    }
)


const viewNotifications = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const params = req.query;
            const notifications = await ContactMessages.find(params)
            res.status(200).json(notifications)
        } catch (error) {
            res.status(400)
            throw new Error("Message not found")
        }
    }
)


export { contactMessage, deleteNotification, viewNotifications }
