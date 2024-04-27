const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

if (!DB) {
  console.error('MongoDB connection string not provided');
  process.exit(1);
}

const start = async () => {
  try {
    await mongoose.connect(DB);
    console.log('MongoDB connected successfully');
    app
      .listen(PORT, () => {
        console.log(`App running on PORT: ${PORT}`);
      })
      .on('error', (err) => {
        console.error('Server startup error:', err.message);
        process.exit(1);
      });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

start();
