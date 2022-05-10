import express from "express";
import logger from "morgan";
import { connectDB } from "./config/db";

import router from "./routes";
import admin from "./routes/admin.route";
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

connectDB();

module.exports = app;
