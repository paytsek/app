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

const envPath =
	process.env.NODE_ENV === 'test' ? './config/test.env' : './config/config.env';

dotenv.config({ path: envPath });

const app = express();

app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set sucurity headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 mins
	max: 100,
});

app.use(limiter);

// prevent http param polution
app.use(hpp());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// API ROUTES
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
