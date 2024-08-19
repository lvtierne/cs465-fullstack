// Import required modules and middleware
var createError = require('http-errors'); // For creating HTTP errors
var express = require('express'); // Express framework
var path = require('path'); // For path operations
var cookieParser = require('cookie-parser'); // For parsing cookies
var logger = require('morgan'); // For logging HTTP requests
var handlebars = require('hbs'); // Handlebars templating engine
require("./app_api/models/db"); // Import database models

// Import route handlers (controllers)
var indexRouter = require('./app_server/routes/index'); // Route handler for the homepage
var usersRouter = require('./app_server/routes/users'); // Route handler for user-related routes
var travelRouter = require('./app_server/routes/travel'); // Route handler for travel-related routes
var aboutRouter = require('./app_server/routes/about'); // Route handler for about page
var contactRouter = require('./app_server/routes/contact'); // Route handler for contact page
var mealsRouter = require('./app_server/routes/meals'); // Route handler for meals
var newsRouter = require('./app_server/routes/news'); // Route handler for news
var roomsRouter = require('./app_server/routes/rooms'); // Route handler for rooms
var apiRouter = require('./app_api/routes/index'); // Route handler for API routes

var app = express(); // Create an Express application

// Set up view engine
app.set('views', path.join(__dirname, 'app_server', 'views')); // Specify the directory for views
app.set('view engine', 'hbs'); // Set Handlebars as the view engine

// Register Handlebars partial templates (reusable components)
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware setup
app.use(logger('dev')); // Log HTTP requests in development mode
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies attached to the client request
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Enable CORS (Cross-Origin Resource Sharing) for API routes
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Allow requests from localhost:4200
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specific headers
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
  next(); // Proceed to the next middleware
});

// Route setup
app.use('/', indexRouter); // Mount indexRouter at the root path
app.use('/users', usersRouter); // Mount usersRouter at the '/users' path
app.use('/travel', travelRouter); // Mount travelRouter at the '/travel' path
app.use('/about', aboutRouter); // Mount aboutRouter at the '/about' path
app.use('/contact', contactRouter); // Mount contactRouter at the '/contact' path
app.use('/meals', mealsRouter); // Mount mealsRouter at the '/meals' path
app.use('/rooms', roomsRouter); // Mount roomsRouter at the '/rooms' path
app.use('/news', newsRouter); // Mount newsRouter at the '/news' path
app.use('/api', apiRouter); // Mount apiRouter at the '/api' path

// Error handling
app.use(function(req, res, next) {
  // Handle 404 errors (Not Found)
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // Handle other errors
  res.locals.message = err.message; // Pass error message to views
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Provide error details only in development

  res.status(err.status || 500); // Set response status code
  res.render('error'); // Render the error view
});

module.exports = app; // Export the Express application
