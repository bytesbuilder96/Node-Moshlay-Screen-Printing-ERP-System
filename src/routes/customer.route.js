import { Router } from "express";
import { loginAuth } from "../middelwares/loginAuth.middelware.js";
import { agentAuth } from "../middelwares/agentAuth.middelware.js";
import {
  createCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
} from "../controllers/customer.controler.js";

const customerRouter = Router();

customerRouter.post("/create", loginAuth, agentAuth, createCustomer);
customerRouter.get("/get-all-agents", loginAuth, agentAuth, getAllCustomer);
customerRouter.get(
  "/get-agent-by-id/:id",
  loginAuth,
  agentAuth,
  getCustomerById
);
customerRouter.put("/update-agent/:id", loginAuth, agentAuth, updateCustomer);

export { customerRouter };
