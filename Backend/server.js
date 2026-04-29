import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/config.js";

const PORT = config.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};
startServer();
