import express, { Application, Request, Response } from "express";

// Routes
import authRoutes from "./routes/authRoutes";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "BloodLink API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API ROUTES
const API = `/api/${process.env.API_VERSION || "v1"}`;
app.use(`${API}/auth`, authRoutes);

export default app;
