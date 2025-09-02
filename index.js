import express from "express"
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import ArticleRouter from "./routes/articalRoute.js";


dotenv.config();
let app= express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
    let token =req.header("Authorization")
    console.log(token)
    if(token != null){
        token=token.replace("Bearer ", "");
        
        jwt.verify(token,process.env.SECRET_KEY,
            (err,decoded)=>{
              
           if(!err){
            
            req.user=decoded; 
           } 
        });
        
    }
    next()
})



let mongoUrl =process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection =mongoose.connection 
connection.once("open",()=>{
    console.log("MongoDB connection successfull")
})
app.use("/api/users",userRouter);
app.use("/api/articles",ArticleRouter);



app.listen(3005,()=>{
    console.log("server is running on 3005")
})