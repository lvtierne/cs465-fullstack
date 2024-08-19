// bring in the DB connection and the trip schema
const Mongoose = require("./db");
const Trip = require("./travlr");

// read seed data from jason file
var fs = require("fs");
var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf8"));

//delete any existing records, then intsert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
  };

// close the MongoDB connection and exit 
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
  });