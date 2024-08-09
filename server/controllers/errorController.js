const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// By specifying 4 parameters Express automatically knows that the function is an error handling middleware
module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500; // If statusCode is not defined, it will be 500
  err.status = err.status || 'error'; // If the error status is not defined, it will be 'error'

  if (process.env.NODE_ENV === 'developement') {
    // If the environment is development, we want to send more detail in the response
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
