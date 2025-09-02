import express from "express";
import { createNews , getAllNews} from "../controller/newsController.js";


const NewsRouter = express.Router();

NewsRouter.post("/",createNews);
NewsRouter.get("/",getAllNews);






export default NewsRouter;