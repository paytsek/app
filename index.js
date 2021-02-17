/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
require('colors');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5001;

const start = async () => {
  const db =
    (process.env.NODE_ENV === 'development' && process.env.MONGO_URI_DEV) ||
    (process.env.NODE_ENV === 'production' && process.env.MONGO_URI_PROD) ||
    (process.env.NODE_ENV === 'local' && process.env.MONGO_URI_LOCAL);

  try {
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error('Connection failed'.red.bold, error);
    process.exit(1);
  }

  app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
};

start();
