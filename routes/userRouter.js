import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/all",getAllUsers)



export default userRouter;