import mongoose from "mongoose";
import { Schema } from "mongoose";

// const post = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//     },
//     userid: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
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
    saved_posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }],
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", user);
