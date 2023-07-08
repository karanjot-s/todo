import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "ABC123";

export const createJWT = (
  username: string,
  userId: string,
  duration: number
) => {
  const payload = {
    username,
    userId,
    duration,
  };

  return sign(payload, SECRET_KEY, {
    expiresIn: duration,
  });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && (authHeader as string).split(" ")[1];
  // console.log(req.headers);

  if (token == null)
    return res.status(401).json({
      error: "Token is required",
    });

  verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Unauthorized" });

    req.user = user;
    next();
  });
};

export const verifyToken = async (token: string) => {
  return verify(token, SECRET_KEY);
};
