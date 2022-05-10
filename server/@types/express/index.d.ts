import { Request } from "express";
import { AdminType } from "../../src/config/admin.validator";

declare global {
  namespace Express {
    interface Request {
      //Put properties to add to request here
      user: AdminType | null
    }
  }
}
