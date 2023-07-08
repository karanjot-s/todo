import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import express from "express";
import router from "./src/routes";
import connectDB from "./src/db";
import cors from "cors";

configDotenv();
const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log("[SUCCESS] Server is running on port " + PORT);
});
