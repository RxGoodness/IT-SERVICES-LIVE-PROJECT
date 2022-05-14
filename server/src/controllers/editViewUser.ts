import { Request, Response, NextFunction } from "express";
import User from "../models/editViewUser";



const viewProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
       
        let email = req.query.email;
   
        const user = await User.findOne( {email} );

        // CHECK IF USER EXIST
        if (user){
            res.status(200).json(user);
        }else{
            res.status(404).json({
                message: 'User not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}


const editProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let email = req.query.email;
        
        const user = await User.findOne( { email } );

        // CHECK IF USER EXIST BEFORE UPDATING PROFILE
        if (!user) {
            res.status(404).json({
                message: 'User does not exist!'
            })
        }else{
            await User.findOneAndUpdate({ email }, req.body, {new: true})
            res.status(200).json({
                message: 'Profile updated successfully!'
            });
        }
    } catch (error) {
        next(error)
    }
}



export {
    viewProfile,
    editProfile
};