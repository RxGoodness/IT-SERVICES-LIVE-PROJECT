require("dotenv").config();
import app from "./app";
import { connection } from "mongoose";

beforeAll(async () => {
  app.listen(4004);
});

afterAll(async () => {
  await connection.dropDatabase();
});
