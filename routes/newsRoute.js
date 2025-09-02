import express from "express";
import { createNews } from "../controller/newsController.js";


const NewsRouter = express.Router();

NewsRouter.post("/",createNews);







export default NewsRouter;