import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import messageRoute from "./routes/message.route.js";
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import {app, server} from './lib/socket.js';
import path from "path";
dotenv.config();
const PORT = process.env.PORT;  // way to access env files

const __dirname=path.resolve();

// Extract data from body
// app.use(express.json());
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //cookie-parser is a middleware library in Express that parses cookies attached to the client's HTTP request.

// frontend port assign
app.use(cors({
  origin:"http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials:true,
}));

// Global Header Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoute);


// For deploying purpose
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// server is the socket server
server.listen(PORT, ()=>
{
console.log("Server is running on port :"+PORT);
connectDB();
});
