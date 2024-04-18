const express = require("express");
const morgan = require("morgan");

const titleRouter = require("./routes/titleRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.use("/api/v1/tours", titleRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
