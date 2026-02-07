import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);

export default router;
