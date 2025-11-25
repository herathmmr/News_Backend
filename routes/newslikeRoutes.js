import express from "express";
import { likeNews } from "../controller/newslikeController.js";

// Create router
const likeroutes = express.Router();

// Route to like a news article
likeroutes.patch("/:id/like", likeNews);

// Export router
export default likeroutes;
