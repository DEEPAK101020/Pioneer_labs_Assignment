const express=require("express");
const jwt=require("jsonwebtoken")
const UserRoute=express.Router();
const bcrypt=require("bcrypt");
const {UserModel}=require("../Models/user.models")
const {BlackListModel}=require("../Models/blacklist.model")

require("dotenv").config();
//gte swagger doc

/**
 * @swagger
 * /user/alldata:
 *   get:
 *     summary: Retrieve all user data
 *     description: Retrieves all user data from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: array

 *       401:
 *         description: No data found or unauthorized
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *               description: Description of the error
 *             error:
 *               type: object
 *               description: Error details (if any)
 *     tags:
 *       - User
 */

//geting all the data
UserRoute.get("/alldata",async(req,res)=>{
    try {
        const data=await UserModel.find();
        res.status(200).json({user:data})
    } catch (error) {
       res.status(401).json({ msg: "No Data Found" ,error});
    }
})


//swagger for registration

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: password123
 *     responses:
 *       '200':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Confirmation message
 *                   example: New User John Doe registered
 *       '400':
 *         description: Unexpected error or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: Unexpected error
 *       '401':
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: User already exists, please login
 */


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

//login swagger


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Hello:
 *                   type: string
 *                   description: Greeting message with user's name
 *                   example: John
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Invalid credentials or unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid credentials
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */



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
//logout swagger
/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Logout user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         type: string
 *         format: JWT
 *     responses:
 *       '200':
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                   example: session logged out
 *       '401':
 *         description: Unauthorized - No token provided or token already blacklisted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: No token provided
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */



//logout route
UserRoute.get("/logout",async(req,res)=>{
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

