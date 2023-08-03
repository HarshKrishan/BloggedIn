import mongoose from "mongoose";
import { Schema } from "mongoose";
const post = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    userid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
post.index({ updatedAt: -1 });
export default mongoose.models.Post || mongoose.model("Post", post);
