import express from "express";
import { likeNews, getLikeStatus } from "../controller/newslikeController.js";

// Create router
const likeroutes = express.Router();

// Route to like a news article
likeroutes.patch("/:id/like", likeNews);

// Route to get like status of a news article
likeroutes.get("/:id/like-status", getLikeStatus);

// Export router
export default likeroutes;
