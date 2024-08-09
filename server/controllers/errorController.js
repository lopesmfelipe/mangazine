const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming  or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

// By specifying 4 parameters Express automatically knows that the function is an error handling middleware
module.exports = (err, req, res, next) => {
  console.log('♥️♥️♥️♥️', process.env.NODE_ENV);
  err.statusCode = err.statusCode || 500; // If statusCode is not defined, it will be 500
  err.status = err.status || 'error'; // If the error status is not defined, it will be 'error'

  if (process.env.NODE_ENV === 'development') {
    // If the environment is development, we want to send more detail in the response
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name, message: err.message };
    console.log('👀👀👀', err.propertyIsEnumerable('name'));
    if (err.name === 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};
