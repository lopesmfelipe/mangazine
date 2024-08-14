"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan")); // Middleware for logging HTTP requests
const cors_1 = __importDefault(require("cors")); // Middleware to handle cross-origin HTTP requests
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = require("./controllers/errorController");
const titleRoutes_1 = __importDefault(require("./routes/titleRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ratingRoutes_1 = __importDefault(require("./routes/ratingRoutes"));
const listRoutes_1 = __importDefault(require("./routes/listRoutes"));
const app = (0, express_1.default)();
mongoose_1.default.set('strictQuery', false);
// MIDDLEWARES
// Middleware to enable CORS
app.use((0, cors_1.default)());
/* app.use(cors({
  origin: 'https://thefrontendapp.com', // Allow requests only from this domain
  methods: ['GET', 'POST'], // Allow specific HTTP methods
})) */
app.use((0, morgan_1.default)('dev')); // 'dev' defines the log format, there are other formats like 'tiny' or 'combined'
app.use(express_1.default.json());
app.use(express_1.default.static(`${__dirname}/public`));
// ROUTES
app.use('/api/v1/titles', titleRoutes_1.default);
app.use('/api/v1/user', userRoutes_1.default);
app.use('/api/v1/rating', ratingRoutes_1.default);
app.use('/api/v1/lists', listRoutes_1.default);
app.use('/api/v1/readlist', listRoutes_1.default);
// needs to be the last part after all the other routes
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorController_1.globalErrorHandler);
exports.default = app;
