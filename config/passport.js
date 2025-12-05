import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("Email not provided by Google"));

        let user = await UserModel.findOne({ email });
        if (!user) {
          user = await UserModel.create({
            firstName: profile.name?.givenName || "Google",
            lastName: profile.name?.familyName || "User",
            email,
            password: bcrypt.hashSync("google-oauth-placeholder", 10),
            profilePicture: profile.photos?.[0]?.value,
            googleId: profile.id,
            authProvider: "google",
            role: "customer"
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;