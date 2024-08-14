"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = require('dotenv');
// Listening and Catching Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION!😭 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');
const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;
if (!DB) {
    throw new Error('Database connection string is not defined in environment variables. ');
}
mongoose_1.default.connect(DB).then(() => console.log('DB connected successfully'));
const server = app.listen(PORT, () => {
    console.log(`App running on PORT: ${PORT}`);
});
// Listening to the unhandled rejection event
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION!😭 Shutting down...');
    // By using server.close() we give the server time to finish all the request that are still pending or being handled at the time and then the server is killed
    server.close(() => {
        process.exit(1); // 0 stands for success, 1 stands for uncaught exception
    });
});
