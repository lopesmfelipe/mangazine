const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log('DB connected successfully'));
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
