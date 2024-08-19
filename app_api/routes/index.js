const express = require('express'); // Express App
const router = express.Router(); // Router Logic

// import the controllers
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router
  .route("/trips")
  .get(tripsController.tripsList) // Get Method routes tripList
  .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method rutes tripsFindByCode - requires parameter
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip);

module.exports = router;
