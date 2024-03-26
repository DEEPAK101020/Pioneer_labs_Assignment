const express=require("express");
const jwt=require("jsonwebtoken")
const UserRoute=express.Router();
const bcrypt=require("bcrypt");
const {UserModel}=require("../Models/user.models")
const {BlackListModel}=require("../Models/blacklist.model")

require("dotenv").config();

//geting all the data
UserRoute.get("/alldata",async(req,res)=>{
    try {
        const data=await UserModel.find();
        res.status(200).json({user:data})
    } catch (error) {
       res.status(401).json({ msg: "No Data Found" ,error});
    }
})

//registration of new user

UserRoute.post("/registration",async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        const existing=await UserModel.findOne({email})
        if(existing){
            res.status(401).json({msg:"user already exist please login"});

        }
        else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(hash){
                    const newUser=new UserModel({name,email,password:hash});
                    await newUser.save();
                    res.status(200).json({msg:`New User ${name} registered`});

                }else{
                    res.status(400).json({msg:"error securing password , please register again"});
                }
            }) 
        }
    } catch (error) {
        res.status(400).json({msg:"unexpected error"});
    }
})

//user login
UserRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const exist=await UserModel.findOne({email});
        if(exist){
            bcrypt.compare(password,exist.password,(err,pass)=>{
                if (err) {
                    return res.status(401).json({ msg: "Invalid credentials" });
                } if (pass) {
                    const secret_key = process.env.secret_key;
                    const token = jwt.sign({ userID: exist._id , name: exist.name }, secret_key, { expiresIn: "7d" });
                    res.status(200).json({Hello :`${exist.name}`, token });
                }
            })
        }
    } catch (error) {
        return res.status(401).json({ msg:error });
    }
})


//logout route
UserRoute.post("/logout",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
         res.status(401).json({ msg: "No token provided" });
    }
    try {
        const tokenexist=await BlackListModel.findOne({token})
        if(!tokenexist){
            const blaklist=new BlackListModel({token});
            await blaklist.save();
             res.status(200).json({ msg: "session logged out" });
        }else{
            return res.status(401).json({ msg: "token already blacklisted" });
        }
    } catch (error) {
         res.status(401).json({ msg:error });
    }
})
module.exports={
    UserRoute
}

