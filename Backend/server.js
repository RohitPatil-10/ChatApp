// const express=require("express");
// const dotenv=require("dotenv");
/*                But we can use here import(ES6) instead of require as it more easy for import and export of components
just we have to include 'type':'module' in package.json.........         */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import useRoute from "./route/auth.route.js"
import messageRoutes from "./route/message.route.js"
import userRoutes from "./route/user.routes.js"

import connectToMongoDB from "./DB/connectToMongoDB.js";
import {app,server,io} from "./socket/Socket.js"
dotenv.config();
// const app=express();

//This help to parse json data comming from user.......(from req.body)
app.use(express.json()); 

//To parse the cookie to check user is logedin or not
app.use(cookieParser());

//This will not work untill u need external package for it called //....dotenv....//
const PORT=process.env.PORT || 5000;
app.get("/",(req,res)=>{
    res.send("Welcome To Home Page")
    console.log("Home")
})
/*
app.get("/api/auth/signup",(req,res)=>{
    res.send("<h1>Sign Up</h1>")
})
app.get("/api/auth/login",(req,res)=>{
    res.send("<h1>Login</h1>")
})
app.get("/api/auth/signout",(req,res)=>{
    res.send("<h1>Sign Out</h1>")
})*/
//instead writing all this code here we can use route middleware......
app.use("/api/auth",useRoute)
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Listening at port ${PORT}..........`)
})