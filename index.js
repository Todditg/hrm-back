import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router/index.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
  optionSuccessStatus:200,
  options: {
    secure: false,
  }
}));
app.use("/api/v1", router);

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(PORT, () =>
      console.log(`Server has been starter on PORT ${PORT}`)
    );
  } catch (err) {
    console.log(err.message);
  }
};

run();
