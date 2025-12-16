import { Router } from "express";
import { loginAdmin } from "../controllers/admin.controler.js";

const loginRouter = Router();

loginRouter.post("/login-admin", loginAdmin);

export { loginRouter };
