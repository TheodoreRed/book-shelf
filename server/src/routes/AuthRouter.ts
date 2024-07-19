import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { User } from "../models/User";

const AuthRouter = express.Router();

AuthRouter.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Getting current user:", req.user);
    res.json(req.user); // Send user data if authenticated
  } else {
    console.log("User not authenticated");
    res.status(401).json({ message: "User not authenticated" });
  }
});

AuthRouter.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Error during logout:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
        return res.status(500).json({ message: "Session destruction failed" });
      }

      res.clearCookie("token");

      return res.json({ message: "Logged out successfully" });
    });
  });
});

AuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req, res) => {
    const user = req.user as User;
    const secretKey = process.env.JWT_SECRET || "your_default_secret_key";
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.redirect(
      process.env.NODE_ENV === "production"
        ? `http://localhost:3000`
        : `http://localhost:5173/dashboard`
    );
  }
);

export default AuthRouter;
