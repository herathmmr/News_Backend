import mongoose from "mongoose";


const NewsSchema = new mongoose.Schema(
  {
    articleId: {
      type: Number,
      required: true,
      unique: true,
  
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Sports", "Business", "Entertainment"],
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date :{
        type: Date,
        default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  }, 
);

const News = mongoose.model("News", NewsSchema);
export default News;
