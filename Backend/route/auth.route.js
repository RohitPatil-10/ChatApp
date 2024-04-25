import express from "express";
import { signin, signout, signup } from "../controller/auth.controller.js";
//This will help to append all routes and help to send data efficiently
const router=express.Router();
//arrow functions are imported from controller folder....
router.post("/signup",signup)
router.post("/signin",signin)
router.post("/signout",signout)

export default router;
