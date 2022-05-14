import express from "express";
import logger from "morgan";
import { connectDB } from "./config/db";
import {notFoundMiddleware} from "./middlewares/errorMiddlewares/notFound"
import editViewRouter from "./routes/editViewUser";
import projectRoute from "./routes/project.route";
import notificationRoute from "./routes/notification.route";
import jobRoute from "./routes/jobs.route";

import blogRouter from "./routes/blogRoute";
import admin from "./routes/admin.route";
import resetPasswordRoute from "./routes/resetPassword";
import quoteRoute from "./routes/quoteRoute";
import faqRoute from "./routes/faq-route";
const cors = require("cors");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

app.use("/profile", editViewRouter);
app.use("/projects", projectRoute);
app.use("/", notificationRoute);
app.use("/jobs", jobRoute);
app.use("/blog", blogRouter);
app.use("/admin", admin);
app.use("/reset-password", resetPasswordRoute);
app.use("/", faqRoute)
app.use("/quotes", quoteRoute);

app.use(notFoundMiddleware)
connectDB();

module.exports = app;
