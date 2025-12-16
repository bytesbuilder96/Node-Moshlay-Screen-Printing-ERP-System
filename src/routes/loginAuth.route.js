import { Router } from "express";
import { loginAuth } from "../middelwares/loginAuth.middelware.js";

const authRouter = Router();

authRouter.get("/auth-access", loginAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Access granted",
    user: req.user,
  });
});
export { authRouter };
