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
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.post || mongoose.model("post", post);
