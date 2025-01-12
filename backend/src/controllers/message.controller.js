import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // List all ids accept from login id
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUserForSidebar: ", error.message);
    res.status(500).json({ error: "Intenal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMassage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    // save the massage to the data base
    await newMassage.save();

    // todo: realtime functionality goes here=>socket.io
    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId)
    {
      io.to(receiverSocketId).emit("newMassage", newMassage);
    }


    res.status(201).json(newMassage);
  } catch(error) {
    console.log("Error in sendMassage controller :", error.massage);
    res.status(500).json({ error: "Interal sever error" });
  }
};
