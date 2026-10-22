import { addAlias } from "module-alias";
import path from "path";

// Dynamically set module alias based on NODE_ENV
const isProduction = process.env.NODE_ENV === "production";
const projectRoot = path.resolve(__dirname, ".."); // Move up from src to project root
const aliasPath = path.join(projectRoot, isProduction ? "dist" : "src");

addAlias("@", aliasPath);

import { createApp } from "./app";

const PORT = process.env.PORT || 5000;


async function bootstrap() {
  try {
    console.log("Starting application...");

    const { httpServer } = await createApp();

    console.log("App created successfully. Starting HTTP server...");

    httpServer.on("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    });

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Bootstrap failed:", error);
    process.exitCode = 1;
  }
}

bootstrap();

