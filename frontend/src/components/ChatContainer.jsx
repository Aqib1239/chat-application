import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MassageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import MassageSeketon from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    isMessagesLoading,
    getMessages,
    selectedUser,
    subscribeToMessage,
    unsubscribeToMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  // console.log( "authUser : ",authUser);

  const [selectedImage, setSelectedImage] = useState(null); // For modal

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();
    return () => unsubscribeToMessage();
  }, [selectedUser._id, getMessages, subscribeToMessage, unsubscribeToMessage]);
  // console.log(messages);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MassageSeketon />
        <MassageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto w-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser.data._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser.data._id
                      ? authUser.data.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                  onClick={() => setSelectedImage(message.image)} // Open modal
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MassageInput />

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on image click
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
