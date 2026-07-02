import { Router } from "express";
import { authController } from "../controllers/authController";
import { validateBody } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/authValidator";

const router = Router();

// Public routes
router.post("/register", validateBody(registerSchema), authController.register);

router.post("/login", validateBody(loginSchema), authController.login);
export default router;
