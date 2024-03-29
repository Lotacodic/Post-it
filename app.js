 const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database");
  } catch (err) {
    console.log(err);
  }
}
connect();

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// port = process.env.MONGODB_URI || 3000;
app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
