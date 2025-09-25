
import express from 'express'
import { getUserProfile, loginUser, registerUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// protected route as token will be required
userRouter.get('/profile', getUserProfile)

export default userRouter;


// import express from "express";
// import {
//   getUserProfile,
//   loginUser,
//   registerUser,
// } from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js"; // ✅ import middleware

// const userRouter = express.Router();

// // Auth routes
// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);

// // Protected route → requires valid token
// userRouter.get("/profile", protect, getUserProfile);

// export default userRouter;
