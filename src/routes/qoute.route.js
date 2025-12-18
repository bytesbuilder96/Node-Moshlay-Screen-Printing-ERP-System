import express from "express";
import {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
  printQuote,
} from "../controllers/qoute.controler.js";

const qouteRouter = express.Router();

qouteRouter.post("/create", createQuote);
qouteRouter.get("/get-all-quote", getAllQuotes);
qouteRouter.get("/get-qoute-by-id/:id", getQuoteById);
qouteRouter.put("/update-qoute/:id", updateQuote);
qouteRouter.delete("/delete-qoute/:id", deleteQuote);
qouteRouter.get("/print-qoute/:id", printQuote);

export { qouteRouter };
