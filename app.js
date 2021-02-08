const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// ROUTES
const companyRoutes = require('./routes/companies');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const departmentRoutes = require('./routes/departments');

const envPath = process.env.NODE_ENV === 'test' ? './config/test.env' : './config/config.env';

dotenv.config({ path: envPath });

const app = express();

app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set sucurity headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

if (process.env.NODE_ENV === 'production') {
  app.use(limiter);
}

// prevent http param polution
app.use(hpp());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// TODO
// CHANGE INTO SSR
app.use(express.static(path.join(__dirname, 'web-app')));
const staticUrls = ['/', '/pricing', '/accountants', '/resources', '/free-trial'];
staticUrls.forEach((url) => {
  app.get(url, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'web-app', 'index.html'));
  });
});

// API DOCUMENTATION
app.use(express.static(path.join(__dirname, 'doc')));
app.get('/api/v1/documentation', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'doc', 'index.html'));
});

// API ROUTES
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/departments', departmentRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
