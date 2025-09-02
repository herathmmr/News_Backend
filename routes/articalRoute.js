import express from "express";
import { createArticle } from "../controller/articalController.js";

const ArticleRouter = express.Router();

ArticleRouter.post("/",createArticle);





export default ArticleRouter;