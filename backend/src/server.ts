import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cors from "cors";
import recipeRouter from "./routers/recipe.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/recipes", recipeRouter);

app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "public", "browser")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "browser", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
