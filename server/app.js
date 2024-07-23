const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

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
  /* res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  }); */

  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail'
  err.statusCode = 404;

  next(err );
});

// By specifying 4 parameters Express automatically knows that the function is an error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
