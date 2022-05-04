import { Request, Response } from "express"

const test = (_req:Request, res:Response) => {
    res.send("Hello World");
}

export default test;