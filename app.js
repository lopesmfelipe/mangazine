const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const titleRouter = require("./routes/titleRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
mongoose.set("strictQuery", false);

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/tours", titleRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
