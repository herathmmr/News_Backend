import express from "express";
import { createNews , getAllNews,deleteNews,updateNews} from "../controller/newsController.js";



const NewsRouter = express.Router();

NewsRouter.post("/",createNews);
NewsRouter.get("/",getAllNews);
NewsRouter.delete("/:id",deleteNews);
NewsRouter.put("/:id",updateNews);





export default NewsRouter;