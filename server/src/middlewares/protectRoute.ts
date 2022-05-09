import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.schema';

const protect = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    let token; 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)

            req.user = await Admin.findById(decoded.id).select('-password')

            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export default protect;