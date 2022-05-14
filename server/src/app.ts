import express from "express";
import logger from "morgan";
import { connectDB } from "./config/db";

import router from "./routes";
import admin from "./routes/admin.route";
import resetPasswordRoute from "./routes/resetPassword";
import quoteRoute from "./routes/quoteRoute";
import serviceRoute from "./routes/service.route";
const cors = require("cors");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

app.use("/", router);
app.use("/admin", admin);
app.use("/reset-password", resetPasswordRoute);
app.use("/services", serviceRoute)
app.use("/", quoteRoute)

connectDB();

module.exports = app;
