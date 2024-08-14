import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'; // Middleware for logging HTTP requests
import cors from 'cors'; // Middleware to handle cross-origin HTTP requests

import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';

import titleRouter from './routes/titleRoutes';
import userRouter from './routes/userRoutes';
import ratingRouter from './routes/ratingRoutes';
import listRouter from './routes/listRoutes';

const app = express();
mongoose.set('strictQuery', false);

// MIDDLEWARES

// Middleware to enable CORS
app.use(cors());

/* app.use(cors({
  origin: 'https://thefrontendapp.com', // Allow requests only from this domain
  methods: ['GET', 'POST'], // Allow specific HTTP methods
})) */

app.use(morgan('dev')); // 'dev' defines the log format, there are other formats like 'tiny' or 'combined'
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/titles', titleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/rating', ratingRouter);
app.use('/api/v1/lists', listRouter);
app.use('/api/v1/readlist', listRouter);

// needs to be the last part after all the other routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
