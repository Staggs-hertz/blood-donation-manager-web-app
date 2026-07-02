import { Request, Response, NextFunction } from "express";
import { sendSuccess, sendCreated } from "../utils/response";
import { authService } from "../services/authService";

export const authController = {
  // REGISTER
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await authService.register(
        req.body,
        req.ip || "",
        req.headers["user-agent"],
      );
      sendCreated(res, result, result.message);
    } catch (error) {
      next(error);
    }
  },

  // LOGIN
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(
        req.body,
        req.ip || "",
        req.headers["user-agent"],
      );
      sendSuccess(res, { user: result.user }, "Login successful");
    } catch (error) {
      next(error);
    }
  },
};
