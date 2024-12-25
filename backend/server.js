const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/chatRoutes.js")
const chatRoutes = require("./routes/chatRoutes.js");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require("path")
const colors = require("colors")
// const { chats } = require('./data/data.js');

dotenv.config();
connectDB();
const app = express();    

app.use(express.json()) // to accept json data
    
// to testing server works or not 
app.get('/', (req, res) => {
    res.send("API is Running");
});


app.use("/api/user", userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/message", messageRoutes);

// -----------------------deployment   # i have to understand this 
const _dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// -----------------------deployment 

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server Started Successfully`.yellow.bold));

//   --- using socket.io       # repeat it 

// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     let chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });
