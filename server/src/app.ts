import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./router";
import errorHandler from "./errors/errorHandler";

// creating an express app
const app = express();

// setters
app.set("port", process.env.PORT);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["access-token"],
  }),
);
app.use(cookieParser());

// routes
app.use(router);

// error
app.use(errorHandler);

export default app;
