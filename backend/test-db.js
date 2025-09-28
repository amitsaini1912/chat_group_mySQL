const mysql = require('mysql2');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aksaini98@",
  database: "chatdb"
});

db.connect(err => {
  if (err) {
    console.error("Connection error:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL!");
  db.end();
});
