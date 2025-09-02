import mongoose from "mongoose";
i

const articleSchema = new mongoose.Schema(
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
      type: "string",
      required: true,
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

const Article = mongoose.model("Article", articleSchema);
export default Article;
