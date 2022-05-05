import express from "express";
import logger from "morgan";
import { connectDB } from "./config";
// import createError from "http-errors";

import router from "./routes";
const cors = require("cors");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

connectDB();

// // catch 404 and forward to error handler
// app.use(function (_req, _res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (
//   err: createError.HttpError,
//   req: express.Request,
//   res: express.Response,
//   _next: express.NextFunction
// ) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
