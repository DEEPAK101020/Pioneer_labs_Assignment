const express=require("express");
const jwt=require("jsonwebtoken")
const ProtectedRoute=express.Router();
const bcrypt=require("bcrypt");
const {auth}=require("../Middleware/auth")



//auth
ProtectedRoute.use(auth)

//get protected routes

ProtectedRoute.get("/protected",(req,res)=>{
    let username=req.body.name;
    console.log(req.body);
        res.status(200).json({message :` ${username} You are viewing protected Data`})
})

module.exports={
    ProtectedRoute
}