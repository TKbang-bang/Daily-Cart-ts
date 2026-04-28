import "dotenv/config";
import express from "express";
import router from "./router";

// creating an express app
const app = express();

// setters
app.set("port", process.env.PORT);

// middlewares
app.use(express.json());

// routes
app.use(router);

export default app;
