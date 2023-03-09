const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000...");
});