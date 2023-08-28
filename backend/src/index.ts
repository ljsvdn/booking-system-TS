import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware to parse the request body
app.use(express.json());

// sample endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// start the express server
const port = 3000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
