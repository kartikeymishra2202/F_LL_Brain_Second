import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const Schema = mongoose.Schema;

const content = new Schema({
  contentId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  title: String,
  link: String,
  type: String,
  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const contentModel = mongoose.model("content", content);

export default contentModel;
