const mongoose = require("mongoose");
const express = require("express");
const app = new express();
const taskRouter = require("./routes/task.routers");
const userRouter = require("./routes/user.routers");
const aiRouter = require("./routes/ai.routers"); // Import the AI routes
const cors = require("cors");
require('dotenv').config();

const Mongo_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 10000;

mongoose.connect(Mongo_URL) 
.then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.log("Error with connecting with DB", err);
})

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/api/ai", aiRouter); 


app.listen(PORT, () => {
    console.log(`Backend is running on Port : ${PORT}`);
})
