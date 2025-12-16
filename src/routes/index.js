import { Router } from "express";
import { agentRouter } from "./agent.route.js";
import { authRouter } from "./loginAuth.route.js";
import { loginRouter } from "./login.route.js";

const router = Router();

router.use("/login/auth/agent", agentRouter);
router.use("/auth", authRouter);
router.use("/login", loginRouter);
export { router };
