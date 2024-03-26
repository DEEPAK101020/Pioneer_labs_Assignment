const express=require("express");
const jwt=require("jsonwebtoken")
const ProtectedRoute=express.Router();
const bcrypt=require("bcrypt");
const {auth}=require("../Middleware/auth")



//auth
ProtectedRoute.use(auth)

/**
 * @swagger
 * admin/protected:
 *   get:
 *     summary: Get protected data
 *     tags: [Protected]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "John Doe, You are viewing protected Data"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Unauthorized - Please login to access this resource
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


ProtectedRoute.get("/protected",(req,res)=>{
    let username=req.body.name;
    console.log(req.body);
        res.status(200).json({message :` ${username} You are viewing protected Data`})
})

module.exports={
    ProtectedRoute
}