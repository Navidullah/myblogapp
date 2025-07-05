// lib/models/CommentModel.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default CommentModel;
