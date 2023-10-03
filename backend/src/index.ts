import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import container from "./utility/container";
import { CustomRequest } from "./utility/container";
import { globalErrorHandler } from "./middlewares/global-error-handler";
import { requestLogger } from "./middlewares/request-logger";
import { verifyJWT } from "./middlewares/verify-JWT";
import { isAdmin } from "./middlewares/is-admin";
import UserController from "./features/user/controllers/user-controller";
import AuthController from "./features/auth/controllers/auth-controller";
import BookingController from "./features/booking/controllers/booking-controller";
import ServiceController from "./features/service/controllers/service-controller";
import BookingTimeController from "./features/bookingtime/controllers/booking-time-controller";
import "./db/database";
import "./db/associations";
dotenv.config();

const app = express();

// rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app
  // middleware to log HTTP requests
  .use(requestLogger)
  // middleware to limit repeated requests to public APIs and/or endpoints
  .use("/api/", apiLimiter)
  // middleware to parse the request body
  .use(express.json())
  // middleware for adding the container to the request object
  .use("/api", (req: CustomRequest, _, next: NextFunction) => {
    req.container = container;
    next();
  })
  // feature routes
  .use("/api/auth", AuthController)
  .use(
    "/api/users",
    (req: Request, res: Response, next: NextFunction) => {
      req.path === "/create" ? next() : verifyJWT(req, res, next);
    },
    isAdmin,
    UserController
  )
  .use("/api/services", verifyJWT, ServiceController)
  .use("/api/bookings", verifyJWT, BookingController)
  .use("/api/booking-times", verifyJWT, BookingTimeController)
  // middleware to handle errors
  .use(globalErrorHandler)
  // sample endpoint
  .get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

// start the express server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
