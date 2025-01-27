import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user_routes";
import share_routes from "./routes/share_routes";
import content_routes from "./routes/content_routes";
import connectDB from "./db/db";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use(cookieParser());
connectDB();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/share", share_routes);
app.use("/api/v1/content", content_routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

