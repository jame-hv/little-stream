import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Token is invalid" });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized. User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
