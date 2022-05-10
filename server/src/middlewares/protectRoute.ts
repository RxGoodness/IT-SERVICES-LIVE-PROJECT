import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/admin.schema";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

        req.user = await Admin.findOne(decoded as JwtPayload);
        next();
      } catch (error) {
        console.log(error);
        res.status(401).json("Not authorized");
      }
    }
    if (!token) {
      res.status(401).json("Not authorized, no token");
    }
  }
);

export default protect;
