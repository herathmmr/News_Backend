import express from "express";
import { createNews , getAllNews,deleteNews} from "../controller/newsController.js";


const NewsRouter = express.Router();

NewsRouter.post("/",createNews);
NewsRouter.get("/",getAllNews);
NewsRouter.delete("/:id",deleteNews);






export default NewsRouter;