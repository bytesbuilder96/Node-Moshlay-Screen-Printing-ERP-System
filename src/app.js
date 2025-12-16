import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes/index.js";

const app = express();

// ╔════════════════════╗
// ║     Middelware     ║
// ╚════════════════════╝
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));

// ╔═══════════════════════╗
// ║     Testing Route     ║
// ╚═══════════════════════╝
app.get("/", (_req, res) => {
  return res.send(
    "<h1 style='display: flex; justify-content: center; align-items: center; font-size:9rem; margin-top:10rem;'>Server is running.</h1>"
  );
});

// ╔═══════════════════╗
// ║     API Route     ║
// ╚═══════════════════╝
app.use("/api", router);

export { app };
