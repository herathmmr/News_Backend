import newslike from "../models/newslikeModel.js";

export const likeNews = async (req, res) => {
  try {
    const updated = await newslike.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.json({ likes: updated.likes });
  } catch (error) {
    res.status(500).json({ error: "Error updating like count" });
  }
};
