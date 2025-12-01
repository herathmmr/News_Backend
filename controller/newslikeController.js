import News from "../models/news.js";
import { isItCustomer, isItAdmin } from "./userController.js";

export const likeNews = async (req, res) => {
  try {
    // Check if user is authorized (customer or admin)
    if (!isItCustomer(req) && !isItAdmin(req)) {
      return res.status(401).json({ error: "Please login to like news" });
    }

    const userEmail = req.user.email; // Get user email from JWT token
    const newsId = req.params.id;

    // Find the news article
    const news = await News.findOne({ _id: newsId });

    if (!news) {
      return res.status(404).json({ error: "News article not found" });
    }

    // Check if user already liked this news
    const hasLiked = news.likedBy && news.likedBy.includes(userEmail);

    if (hasLiked) {
      // Unlike: remove user from likedBy array and decrease like count
      const updated = await News.findOneAndUpdate(
        { _id: newsId },
        { 
          $pull: { likedBy: userEmail },
          $inc: { likes: -1 }
        },
        { new: true }
      );
      
      return res.json({ 
        message: "Unliked successfully", 
        likes: updated.likes,
        isLiked: false 
      });
    } else {
      // Like: add user to likedBy array and increase like count
      const updated = await News.findOneAndUpdate(
        { _id: newsId },
        { 
          $addToSet: { likedBy: userEmail }, // $addToSet prevents duplicates
          $inc: { likes: 1 }
        },
        { new: true }
      );
      
      return res.json({ 
        message: "Liked successfully", 
        likes: updated.likes,
        isLiked: true 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      error: "Error updating like count", 
      message: error.message 
    });
  }
};

// Get like status for current user
export const getLikeStatus = async (req, res) => {
  try {
    if (!isItCustomer(req) && !isItAdmin(req)) {
      return res.status(401).json({ error: "Please login" });
    }

    const userEmail = req.user.email;
    const newsId = req.params.id;

    const news = await News.findOne({ _id: newsId });

    if (!news) {
      return res.status(404).json({ error: "News article not found" });
    }

    const isLiked = news.likedBy && news.likedBy.includes(userEmail);

    res.json({ 
      likes: news.likes, 
      isLiked,
      articleId: news._id
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Error fetching like status", 
      message: error.message 
    });
  }
};
