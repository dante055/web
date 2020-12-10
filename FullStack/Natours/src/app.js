const path = require('path');
const express = require('express');
const morgan = require('morgan');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// ------------ Create a new express app -------
const app = express();

// ------------ trust proxy for heroku ---------
app.enable('trust proxy');

// ------------ View middlwwares -----------
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ------ middleware to get acces of static files ------
app.use(express.static(path.join(__dirname, '../', 'public')));

// ------ middleware to show the req in the console -----
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ------ Set security HTTP headers ------
app.use(helmet());

// ------ Limit requests from same API ------
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// ------- Data sanitization against NoSQL query injection ---
app.use(mongoSanitize());

// ------- Data sanitization against XSS -----------
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// ----- Compress all the response ---------------
app.user(compression());

// ----- implement CORS-----------------------
app.use(cors());
// for non simple request
app.options('*', cors());

// ------ Body parser, reading data from body into req.body -----
app.use(express.json({ limit: '10kb' }));

// ------ Parses the data from the cookie -------------
app.use(cookieParser());

//------ Parse the data comming from the form (when sendinf data using forms ) ----------
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ------ custom middleware ---------------------
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ------ Template Routes -------
// We will go in viewes to get the pug file, As we have define the path with the engine at the top
app.use('/', viewRouter);

// ----- API Routes ----------------
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRoutes);

// ----- Unimplemented route handler -------
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

// ---- error handling middleware --------
app.use(globalErrorHandler);

module.exports = app;
