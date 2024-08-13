import { Router } from "express";
import { AuthController } from "../adapters/controllers/AuthController";

const router = Router();

router.get("/google", AuthController.googleAuth);

router.get(
  "/google/callback",
  AuthController.googleCallback,
  AuthController.redirectAfterLogin
);

router.get("/check-session", AuthController.checkSession);

router.get("/user", AuthController.getUser);

router.post("/logout", AuthController.logout);

export default router;
