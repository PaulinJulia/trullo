// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";

// interface AuthenticatedRequest extends Request {
//   user?: JwtPayload;
// }

// const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   if (!process.env.JWT_SECRET) {
//     return res.status(500).json({ message: "Internal server error" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
//     req.user = decoded; 
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export { auth };
