import { prisma } from "./config/database";
import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 5001;

async function startServer(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    const server = app.listen(PORT, () => {
      console.log(
        `🚀 BloodLink API running on port ${PORT} in ${process.env.NODE_ENV} mode`,
      );
      console.log(
        `📖 API Base URL: http://localhost:${PORT}/api/${process.env.API_VERSION || "v1"}`,
      );
    });

    const shutdown = async (signal: string) => {
      console.log(`${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log("Database disconnected");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Promise Rejection:", reason);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
