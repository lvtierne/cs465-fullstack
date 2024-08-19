// Load environment variables from .env file
require("dotenv").config();

// Import required modules
var createError = require('http-errors'); // For creating HTTP errors
var express = require('express'); // Express framework for Node.js
var path = require('path'); // Utility for working with file and directory paths
var cookieParser = require('cookie-parser'); // Middleware for parsing cookies
var logger = require('morgan'); // HTTP request logger middleware
var handlebars = require('hbs'); // Handlebars view engine
const passport = require('passport'); // Authentication middleware

// Import database configuration and passport setup
require("./app_api/models/db"); // Connect to the database
require('./app_api/config/passport'); // Configure passport for authentication

// Define routers for different routes
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var aboutRouter = require('./app_server/routes/about');
var contactRouter = require('./app_server/routes/contact');
var mealsRouter = require('./app_server/routes/meals');
var newsRouter = require('./app_server/routes/news');
var roomsRouter = require('./app_server/routes/rooms');
var apiRouter = require('./app_api/routes/index');

// Create an Express application
var app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'app_server', 'views')); // Directory for views
handlebars.registerPartials(__dirname + '/app_server/views/partials'); // Register Handlebars partials
app.set('view engine', 'hbs'); // Set Handlebars as the view engine

// Middleware setup
app.use(logger('dev')); // Log HTTP requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory
app.use(passport.initialize()); // Initialize passport for authentication

// Enable CORS for API routes
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Allow requests from this origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept, Authorization'); // Allow these headers
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow these HTTP methods
  next(); // Continue to the next middleware
});

// Route setup
app.use('/', indexRouter); // Handle root routes
app.use('/users', usersRouter); // Handle routes for users
app.use('/travel', travelRouter); // Handle routes for travel
app.use('/about', aboutRouter); // Handle routes for about
app.use('/contact', contactRouter); // Handle routes for contact
app.use('/meals', mealsRouter); // Handle routes for meals
app.use('/rooms', roomsRouter); // Handle routes for rooms
app.use('/news', newsRouter); // Handle routes for news
app.use('/api', apiRouter); // Handle API routes

// Error handling
app.use(function(req, res, next) {
  // Handle 404 errors
  next(createError(404));
});

app.use((err, req, res, next) => {
  // Handle unauthorized errors
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  } else {
    next(err); // Pass other errors to the default error handler
  }
});

app.use(function(err, req, res, next) {
  // Default error handler
  res.locals.message = err.message; // Set error message
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Provide error details only in development

  res.status(err.status || 500); // Set response status code
  res.render('error'); // Render error page
});

// Export the app module
module.exports = app;
