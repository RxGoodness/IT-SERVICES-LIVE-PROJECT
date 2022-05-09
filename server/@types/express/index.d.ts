import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      //Put properties to add to request here
    }
  }
}
