import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User";
import db from "../db";
import { RowDataPacket } from "mysql2";

export const setupGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE googleId = ?",
            [profile.id]
          );

          let user = rows[0];

          if (!user) {
            console.log(profile);

            const newUser = {
              googleId: profile.id,
              username: profile.displayName || "google_user",
              email: profile.emails ? profile.emails[0].value : "",
            };
            await db.query(
              "INSERT INTO users (googleId, username, email) VALUES (?,?,?)",
              [newUser.googleId, newUser.username, newUser.email]
            );
            const [newRows] = await db.query<RowDataPacket[]>(
              "SELECT * FROM users WHERE googleId = ?",
              [profile.id]
            );
            user = newRows[0];
          }

          done(null, user || undefined);
        } catch (error) {
          console.error("Error in GoogleStrategy", error);
          done(null, undefined);
        }
      }
    )
  );
};

// Serialize user to the session
passport.serializeUser((user: Partial<User>, done) => {
  done(null, user.googleId?.toString());
});

// Deserialize user from the session
passport.deserializeUser(async (googleId: string, done) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE googleId = ?",
      [googleId]
    );

    const user = rows[0];

    done(null, user);
  } catch (error) {
    done(error);
  }
});
