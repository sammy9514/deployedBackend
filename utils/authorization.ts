import { NextFunction, Request, Response } from "express";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (token) {
    const value = token.split(" ")[1];

    if (value) {
      // jwt.verify(value, "just", (err:Error, data))
    }
  }
};
