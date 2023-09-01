import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import "./db/database";
import "./db/associations";

const app = express();

// rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(requestLogger);

app.use("/api/", apiLimiter);

// middleware to parse the request body
app.use(express.json());

// middleware to handle errors
app.use(globalErrorHandler);

// sample endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// start the express server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});