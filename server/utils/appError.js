class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Whatever we pass into the the parent/super class 'Error', is gonna be the message property 

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;  // Basically all the errors that we create ourselves will be operational errors

    Error.captureStackTrace(this, this.contructor); // when a new object of this class is created and the constructor function is called, then that function call is not gonna appear in the stack trace, and will not pullute it.
  }
}

module.exports = AppError;
