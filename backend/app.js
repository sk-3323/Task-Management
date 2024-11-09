import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import taskRouter from "./route/task.route.js";
import userRouter from "./route/user.route.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

app.get("/", function (req, res) {
  res.send("Hello Admin");
});

app.listen(3000);
