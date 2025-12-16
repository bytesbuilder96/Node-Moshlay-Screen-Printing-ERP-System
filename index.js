import "dotenv/config";
import { connectDB } from "./src/config/db.config.js";
import { app } from "./src/app.js";
import { createDefaultAdmin } from "./src/utils/createDefultAdmin.util.js";

const serverStart = async () => {
  try {
    await connectDB();
    await createDefaultAdmin();
    app.listen(process.env.PORT || 4000, () => {
      console.log(`sever successfuly start on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server not started.");
  }
};
serverStart();
