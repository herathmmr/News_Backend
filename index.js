import express from "express"
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv";


dotenv.config();
let app= express();

app.use(bodyParser.json());



let mongoUrl =process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection =mongoose.connection 
connection.once("open",()=>{
    console.log("MongoDB connection successfull")
})


app.listen(3004,()=>{
    console.log("server is running on 3003")
})