"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
// HANDLE DB CAST ERROR
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new appError_1.default(message, 400);
};
// HANDLE DB DUPLICATED FIELDS
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new appError_1.default(message, 400);
};
// HANDLE DB VALIDATION ERROR
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new appError_1.default(message, 400);
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
    }
    else {
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
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // If statusCode is not defined, it will be 500
    err.status = err.status || 'error'; // If the error status is not defined, it will be 'error'
    if (process.env.NODE_ENV === 'development') {
        // If the environment is development, we want to send more detail in the response
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = Object.assign({}, err);
        // Manually copy non-enumerable properties
        error.message = err === null || err === void 0 ? void 0 : err.message;
        error.name = err === null || err === void 0 ? void 0 : err.name;
        error.code = err === null || err === void 0 ? void 0 : err.code;
        error.errmsg = err === null || err === void 0 ? void 0 : err.errmsg;
        if (err.name === 'CastError')
            error = handleCastErrorDB(error);
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        sendErrorProd(error, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
