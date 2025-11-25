import News from "../models/news.js";

export const likeNews = async (req, res) => {
  try {
    const updated = await News.findOneAndUpdate(
      { _id: req.params.id },   // <-- FIXED HERE
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "News article not found" });
    }

    res.json({ message: "Liked successfully", likes: updated.likes });
  } catch (error) {
    res.status(500).json({ error: "Error updating like count", message: error.message });
  }
};
