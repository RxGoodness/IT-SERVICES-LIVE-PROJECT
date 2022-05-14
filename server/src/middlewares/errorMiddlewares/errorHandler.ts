import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode || 500;
  let msg =
    err.message.replaceAll('"', "") || "Something went wrong, try again later";

  if (err.code && err.code === 11000) {
    statusCode = 400;
    msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  if (err.name === "ValidationError" && err.details) {
    statusCode = 400;
    msg = Object.values(err.details)
      .map((item: any) => item.message.replaceAll('"', ""))
      .join("");
  }

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
