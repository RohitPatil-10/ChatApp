// const express=require("express");
// const dotenv=require("dotenv");
/*                But we can use here import(ES6) instead of require as it more easy for import and export of components
just we have to include 'type':'module' in package.json.........         */
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import useRoute from "./route/auth.route.js"
import messageRoutes from "./route/message.route.js"
import userRoutes from "./route/user.routes.js"

import connectToMongoDB from "./DB/connectToMongoDB.js";
import {app,server,io} from "./socket/Socket.js"

//This will not work untill u need external package for it called //....dotenv....//
const PORT=process.env.PORT || 5000;
const __dirname = path.resolve();


dotenv.config();

//This help to parse json data comming from user.......(from req.body)
app.use(express.json()); 

//To parse the cookie to check user is logedin or not
app.use(cookieParser());


// app.get("/",(req,res)=>{
//     res.send("Welcome To Home Page")
//     console.log("Home")
// })
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

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});



server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Listening at port ${PORT}..........`)
})