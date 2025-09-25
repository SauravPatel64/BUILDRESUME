import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // ✅ split by space → "Bearer <token>"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
       if (!req.user) {
         return res.status(404).json({ message: "User not found" });
       }
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no Token Found" });
    }
  } catch (error) {
    res.status(401).json({
      message: "Token failed",
      error: error.message,
    });
  }
};
