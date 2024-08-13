import { Request, Response } from "express";
import passport from "passport";

export class AuthController {
  static googleAuth(req: Request, res: Response, next: Function) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }

  static googleCallback(req: Request, res: Response, next: Function) {
    passport.authenticate("google", { failureRedirect: "/" })(req, res, next);
  }

  static redirectAfterLogin(req: Request, res: Response) {
    res.redirect(process.env.CLIENT_URL!);
  }

  static checkSession(req: Request, res: Response) {
    res.json({ authenticated: req.isAuthenticated() });
  }

  static getUser(req: Request, res: Response) {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  static logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  }
}
