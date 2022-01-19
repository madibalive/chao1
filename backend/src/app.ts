import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import passport from "passport";
import * as userController from "./controllers/user";
import * as openapiController from "./controllers/openapi";
import { jwtAuthentMiddleware } from "./config/passport";
import { customErrorHandler } from "./utils/errorHandler";

const app = express();

// ===== Express configuration =====
app.use(helmet());
app.use(bodyParser.json());
app.use(passport.initialize());

// ===== App routes =====
// === Main routes ===
app.post("/login", userController.postLogin);
app.post("/signup", userController.postSignUp);
app.get("/users", userController.getUsers);
app.get("/me", jwtAuthentMiddleware, userController.getMe);

// ===== Errors handler =====
app.use(customErrorHandler);

export default app;
