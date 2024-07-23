const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const titleRouter = require('./routes/titleRoutes');
const userRouter = require('./routes/userRoutes');
const ratingRouter = require('./routes/ratingRoutes');
const listRouter = require('./routes/listRoutes');

const app = express();
mongoose.set('strictQuery', false);

// Middleware to enable CORS
app.use(cors());

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/titles', titleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/rating', ratingRouter);
app.use('/api/v1/lists', listRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
