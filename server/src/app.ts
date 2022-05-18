import cors from "cors";
import logger from "morgan";
import express from "express";
import { connectDB } from "./config/db";

// Import Routes controllers
import admin from "./routes/admin.route";
import faqRoute from "./routes/faq-route";
import jobRoute from "./routes/jobs.route";
import blogRouter from "./routes/blogRoute";
import quoteRoute from "./routes/quoteRoute";
import projectRoute from "./routes/project.route";
import partnership from "./routes/partnership.route";
import editViewRouter from "./routes/editViewUser";
import resetPasswordRoute from "./routes/resetPassword";
import notificationRoute from "./routes/notification.route";

// Error handlers
import notFound from "./middlewares/errorMiddlewares/notFound";
import errorHandler from "./middlewares/errorMiddlewares/errorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

// Routes
app.use("/", faqRoute);
app.use("/admin", admin);
app.use("/jobs", jobRoute);
app.use("/blog", blogRouter);
app.use("/quotes", quoteRoute);
app.use("/", notificationRoute);
app.use("/projects", projectRoute);
app.use("/profile", editViewRouter);
app.use("/partnership", partnership);
app.use("/reset-password", resetPasswordRoute);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Connect database
connectDB();

export default app;
