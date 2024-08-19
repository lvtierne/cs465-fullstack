const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router instance for handling routes
const { expressjwt: jwt } = require("express-jwt"); // Import JWT middleware for authentication

// Configure JWT authentication middleware
const auth = jwt({
  secret: process.env.JWT_SECRET, // Secret key for verifying JWTs, loaded from environment variables
  algorithms: ['HS256'], // Specify the algorithm used to sign the JWT
  userProperty: "payload", // Property name to store the decoded JWT payload
});

// Import the controllers for handling authentication and trips
const authController = require("../controllers/authentication"); // Controller for authentication-related actions
const tripsController = require('../controllers/trips'); // Controller for trips-related actions

// Define routes for authentication
router.route("/login")
  .post(authController.login); // Handle POST requests to /login with the login controller

router.route("/register")
  .post(authController.register); // Handle POST requests to /register with the register controller

// Define routes for trips endpoint
router
  .route("/trips")
  .get(tripsController.tripsList) // Handle GET requests to /trips with the tripsList controller
  .post(auth, tripsController.tripsAddTrip); // Handle POST requests to /trips with the tripsAddTrip controller, requires authentication

// Define routes for individual trip operations, requires tripCode parameter
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode) // Handle GET requests to /trips/:tripCode with the tripsFindByCode controller
  .put(auth, tripsController.tripsUpdateTrip); // Handle PUT requests to /trips/:tripCode with the tripsUpdateTrip controller, requires authentication

// Export the router to be used in other parts of the application
module.exports = router;
