import express from "express";
import { likeNews } from "../controller/newslikeController.js";

const router = express.Router();

router.patch("/:id/like", likeNews);

export default router;
