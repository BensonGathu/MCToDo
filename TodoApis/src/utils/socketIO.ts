import { Server } from "http";
import { Server as SocketServer, Socket } from "socket.io";

export function setupSocket(server: Server): SocketServer {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`User connected on ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID ${socket.id} joined room ${data}`);
    });

    socket.on("disconnect", function () {
      console.log(`User disconnected ${socket.id}`);
    });
  });

  return io;
}
