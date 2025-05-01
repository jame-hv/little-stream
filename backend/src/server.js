import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/database.js";

const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
  connectDB();
});
