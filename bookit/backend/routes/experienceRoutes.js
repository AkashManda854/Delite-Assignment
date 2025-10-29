import express from "express";
import { experiences } from "../data/experiences.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(experiences);
});

router.get("/:id", (req, res) => {
  const experience = experiences.find(e => e.id === parseInt(req.params.id));
  if (experience) {
    res.json(experience);
  } else {
    res.status(404).json({ message: "Experience not found" });
  }
});

export default router;
