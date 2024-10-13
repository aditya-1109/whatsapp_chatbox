import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import chatModel from "./Schema/chatSchema.js";
import userRouter from "./routes/userRoute.js"; // Your user routes

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }, // Frontend URL
});

mongoose.connect("mongodb://localhost:27017/chatuser");

app.use(express.json());
app.use("/api/user", userRouter);

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  // Handle message sent
  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    const chatMessage = new chatModel({ senderId, receiverId, message });
    await chatMessage.save();
    // Emit message to the receiver
    io.emit("receiveMessage", { message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
