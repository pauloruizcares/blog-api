import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import connectDB from "../config/database";
import setupSwagger from "../config/swagger";
import blogPostRoutes from "../routes/BlogPostRoutes";
import authRoutes from "../routes/AuthRoutes";
import cors from "cors";
import morgan from "morgan";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("combined"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:
        process.env.CALLBACK_URL ||
        "http://localhost:4000/auth/google/callback",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done: Function) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: Function) => {
  done(null, obj);
});

setupSwagger(app);

app.use("/api/blogposts", authMiddleware, blogPostRoutes);
app.use("/api/auth", authRoutes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
