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
      required:true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.user || mongoose.model("user", user);
