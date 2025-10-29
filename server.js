import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BookIt API is running 🚀");
});

// Sample experiences
const experiences = [
  { id: 1, title: "Beach Paradise", price: 200, image: "https://source.unsplash.com/featured/?beach" },
  { id: 2, title: "Mountain Adventure", price: 150, image: "https://source.unsplash.com/featured/?mountain" },
];

// API endpoint
app.get("/experiences", (req, res) => {
  res.json(experiences);
});

// Start server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
