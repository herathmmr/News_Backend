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
  },
  likedBy: [{
    type: String, // Store user emails
    ref: 'User'
  }]
});

export default mongoose.model("newslike", newslikeSchema);
