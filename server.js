const express = require("express");
const path = require("path");

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home route (optional, since index.html works automatically)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Manual route for /about (clean URL)
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Basic text route
app.get("/contact", (req, res) => {
  res.send("Contact page working 🚀");
});

// JSON response route
app.get("/about-api", (req, res) => {
  res.json({ message: "About API working" });
});

// Query parameter example
app.get("/greet", (req, res) => {
  const name = req.query.name || "Guest";
  res.send(`Hello ${name}`);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});