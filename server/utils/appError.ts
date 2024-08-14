class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message); // Whatever we pass into the the parent/super class 'Error', is gonna be the message property

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Basically all the errors that we create ourselves will be operational errors

    // Capture the stack trace and exclude the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
