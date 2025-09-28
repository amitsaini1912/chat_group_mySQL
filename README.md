# 💬 Chat App (Node.js + MySQL)

A simple chat application built with **Node.js**, **Express.js**, **MySQL**, and **Vanilla JS** for the frontend.  
This project demonstrates how to connect a Node.js backend with a MySQL database and interact with a basic frontend.

---

## 🚀 Features
- Backend API with **Express.js**
- Database integration using **MySQL**
- Simple frontend with **HTML, CSS, and JS**
- Store & retrieve chat messages
- REST API endpoints for communication

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
---

## 2. Install Dependencies

Go to backend folder and install required Node.js packages:
cd backend
npm install


##🗄️ Database Setup (MySQL)

1. Open MySQL Workbench (or MySQL CLI).

2. Run the following SQL commands to create the database and table:

CREATE DATABASE chatdb;

USE chatdb;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


3. Update database credentials in backend/server.js:

const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // replace with your MySQL username
  password: "yourpass",  // replace with your MySQL password
  database: "chatdb"
});


▶️ Running the Project
Start Backend

cd backend
npm start

