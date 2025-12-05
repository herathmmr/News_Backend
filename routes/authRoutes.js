import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL || "http://localhost:3000"}/login` }),
  (req, res) => {
    const token = jwt.sign(
      {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role,
        profilePicture: req.user.profilePicture,
        phone: req.user.phone
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/auth/success?token=${token}`);
  }
);

export default router;