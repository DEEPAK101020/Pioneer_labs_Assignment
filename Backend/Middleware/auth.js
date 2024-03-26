const mongoose=require("mongoose")
const jwt=require("jsonwebtoken");
require("dotenv").config()
const {BlackListModel}=require("../Models/blacklist.model")

const auth=async(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1];
 if(!token){
    res.status(400).json({msg:"please provide token"})
    
 }
 const blacklist=await BlackListModel.findOne({token})
 if(blacklist){
        res.status(400).json({msg:"Your token has been Blacklisted"})
    }
else{
        try{
            const decoded=jwt.verify(token,process.env.secret_key);
            if(decoded){
                req.body.userID=decoded.userID;
                req.body.name=decoded.name;
                next();
            }else{
                res.status(200).json({message:"You are not authorized"})
            }
    }catch(err){
            res.status(400).json({err})
    }
}
}

module.exports={
    auth
}