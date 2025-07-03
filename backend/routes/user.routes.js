import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

let userRoute = express.Router();

userRoute.get("/getuser", isAuth, getCurrentUser);

export default userRoute;
