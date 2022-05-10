import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.models'



const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded: string | jwt.JwtPayload = jwt.verify(token, `${process.env.JWT_SECRET}`)

            // get user from token
            req.user = await User.findById(decoded.id).select('-password');
            
            next()

        } catch (error) {
            res.status(401).json('not authorized')
        }
    }

    if(!token){
        res.status(401).json('not authorized')
    }



}


export default protect;