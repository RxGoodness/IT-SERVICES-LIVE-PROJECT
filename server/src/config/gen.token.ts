import jwt from "jsonwebtoken";

//Token generator accepts any object or string
interface AnyObj {
  [key: string]: string;
}

function genToken(data: AnyObj | string) {
  return jwt.sign(data, process.env.JWT_SECRET as string);
}

export default genToken;
