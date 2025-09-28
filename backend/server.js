const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",  
  password: "Aksaini98@",
  database: "chatdb",
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Fetch messages API
app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages ORDER BY timestamp ASC", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Socket.io for real-time chat
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("chatMessage", (data) => {
    const { sender, message } = data;
    db.query("INSERT INTO messages (sender, message) VALUES (?, ?)", 
      [sender || "Anonymous", message], (err) => {
        if (err) throw err;
        io.emit("chatMessage", {
          username: sender || "Anonymous",
          message,
          timestamp: new Date()
        });
      });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
