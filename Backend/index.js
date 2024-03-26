const express=require("express");
const mongoose=require("mongoose")
const { connection } = require("./db");
const {UserRoute}=require("./Routes/userRoutes")
const {ProtectedRoute}=require("./Routes/protected.route")
const {FetchRoute}=require("./Routes/api.fetch")
const swaggerui=require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc");

const app=express()
app.use(express.json())

//swagger
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"pioneers_lab",
            version:"1.0.0",
        },
        servers:[
            {url:"http://localhost:3000"},
        ]
    },apis:[
        "./routes/*.js"
    ]
}


const OpenApi=swaggerJSDoc(options);
app.use("/swagger",swaggerui.serve,swaggerui.setup(OpenApi))


app.get("/",(req,res)=>{
    res.json("The Base API for Backend")
})

//User routes
app.use("/user",UserRoute)

//protected Route
app.use("/admin",ProtectedRoute)

//fetch
app.use("/fetch", FetchRoute);

//local connection to post and Database
app.listen(3000,async(req,res)=>{
    try {
        await connection;
        console.log("Connected To DataBase");
        console.log("Port Is Running At http://localhost:3000");
    } catch (error) {
        console.log(error);
    }
})