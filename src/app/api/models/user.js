import mongoose from "mongoose";
import { Schema } from "mongoose";
const user = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    saved_posts: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", user);
