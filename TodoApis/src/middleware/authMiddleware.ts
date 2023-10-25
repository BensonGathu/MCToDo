
/**
 * Middleware for authenticating requests using JSON Web Tokens (JWT).
 * It checks the 'Authorization' header for a JWT token and verifies its validity.
 * If the token is valid, it decodes the user ID and attaches it to the request object.
 * If the token is missing or invalid, it returns an error response.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_TOKEN;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Extract the token from the 'Authorization' header.
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // Return an error response if the token is missing.

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication failed. Token is missing." });
  }

  try {

    // Verify the JWT token using the secret.
    const decoded = jwt.verify(token, jwtSecret) as { id: string };

    // Attach the decoded user ID and the token to the request object.
    req.user = { id: decoded.id };
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Authentication failed. Invalid token." });
  }
};

export default authMiddleware;
