import { Router } from "express";
import { loginRouter } from "./login.route.js";
import { authRouter } from "./loginAuth.route.js";
import { agentRouter } from "./agent.route.js";

const router = Router();

router.use("/login", loginRouter);
router.use("/auth", authRouter);
router.use("/agent", agentRouter);
export { router };
