import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_TOKEN;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication failed. Token is missing." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: string };

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Authentication failed. Invalid token." });
  }
};

export default authMiddleware;
