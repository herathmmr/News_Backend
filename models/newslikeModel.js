import mongoose from "mongoose";

const newslikeSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  category: String,
  author: String,
  date: Date,
  likes: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("newslike", newslikeSchema);
