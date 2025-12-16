import { Router } from "express";
import { loginAuth } from "../middelwares/loginAuth.middelware.js";
import { adminAuth } from "../middelwares/adminAuth.middelware.js";

import {
  createAgent,
  getAgentById,
  getAllAgents,
  updateAgentById,
  deleteAgentById,
} from "../controllers/agent.controler.js";

const agentRouter = Router();

agentRouter.post("/create", loginAuth, adminAuth, createAgent);
agentRouter.get("/get-all-agents", loginAuth, adminAuth, getAllAgents);
agentRouter.get("/get-agent-by-id/:id", loginAuth, adminAuth, getAgentById);
agentRouter.put("/update-agent/:id", loginAuth, adminAuth, updateAgentById);
agentRouter.delete("/delete-agent/:id", loginAuth, adminAuth, deleteAgentById);

export { agentRouter };
