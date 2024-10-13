import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
