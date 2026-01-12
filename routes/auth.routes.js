import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', signup)
authRouter.post('/log-in', login)
authRouter.post('/log-out', logout)

export default authRouter;