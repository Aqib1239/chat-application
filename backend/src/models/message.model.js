import mongoose from "mongoose";

const MESSAGE_SCHEMA = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: function () {
        return !this.image; // Only required if image is not present
      },
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MESSAGE_SCHEMA);
export default Message;
