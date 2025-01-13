
import http from "http";
import express from "express";
import { Server } from "socket.io";

const app=express();
const server=http.createServer(app);

const io=new Server(server, {
  cors:{
    origin: "https://quicktalk-application.vercel.app",
    methods:["GET","POST","PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
  },
});



// Used to store online users
const userSocketMap={};


// helper function
export function getReceiverSocketId(userId)
{
return userSocketMap[userId];
}

// incomming connections
// This listens for a new client connection to the server.
// Each client connection gets a unique id assigned by Socket.IO.
// This listens for the disconnect event, which is triggered when a client disconnects.
io.on("connection",(socket)=>
{
  console.log("A user connected", socket.id);
  const userId=socket.handshake.query.userId;
  if(userId)userSocketMap[userId]=socket.id;

  // io.emit() is used to send event to all the connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap));


  socket.on("disconnect", ()=>
  {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});






export {io, app, server};
