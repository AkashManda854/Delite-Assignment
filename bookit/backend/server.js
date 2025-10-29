// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import experienceRoutes from "./routes/experienceRoutes.js"; // <-- add this line

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use your routes here
app.use("/experiences", experienceRoutes);

// Default route (optional)
app.get("/", (req, res) => {
  res.send("Backend server is running successfully 🚀");
});

// Server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
