const socket = io("http://localhost:5000");

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

let username = "Anonymous";

// Load old messages
fetch("http://localhost:5000/messages")
  .then(res => res.json())
  .then(messages => {
    messages.forEach(msg => appendMessage(msg, msg.username === username ? "you" : "other"));
  });

// Listen for messages
socket.on("chatMessage", (data) => {
  appendMessage(data, data.username === username ? "you" : "other");
});

// Send message
sendBtn.addEventListener("click", () => {
  sendMessage();
});

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("chatMessage", { username, message });
    messageInput.value = "";
  }
}

// Append to UI
function appendMessage(data, type) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", type);
  msgDiv.innerHTML = `<b>${data.username}</b>: ${data.message}
                      <span class="timestamp">${new Date(data.timestamp).toLocaleTimeString()}</span>`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
