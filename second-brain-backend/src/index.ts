import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user_routes";
import share_routes from "./routes/share_routes";
import content_routes from "./routes/content_routes";
import connectDB from "./db/db";
import cors from "cors";

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://f-ll-brain.vercel.app",
    "http://localhost:3000",
    "https://f-ll-brain-second.vercel.app/",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cookie",
    "X-Requested-With",
  ],
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
connectDB();

// Root route handler
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Second Brain API" });
});

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/share", share_routes);
app.use("/api/v1/content", content_routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
