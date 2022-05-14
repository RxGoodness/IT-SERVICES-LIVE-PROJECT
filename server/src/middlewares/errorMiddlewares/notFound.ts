import { Request, Response } from "express";
const notFoundMiddleware = (_req: Request, res: Response) => {
  res.status(404).json({ msg: "Route does not exist" });
};

export default notFoundMiddleware;
