const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;