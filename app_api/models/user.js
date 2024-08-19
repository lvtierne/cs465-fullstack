const mongoose = require("mongoose"); // Import Mongoose for MongoDB object modeling
const crypto = require("crypto"); // Import Node.js crypto module for hashing
const jwt = require("jsonwebtoken"); // Import JSON Web Token for generating tokens

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, // Ensure email is unique across users
        required: true, // Email is a required field
    },
    name: {
        type: String,
        required: true, // Name is a required field
    },
    hash: String, // Field to store the hashed password
    salt: String, // Field to store the salt used for hashing
});

// Method to set a hashed password and salt
userSchema.methods.setPassword = function(password) {
    // Generate a new salt
    this.salt = crypto.randomBytes(16).toString("hex");
    // Create a hash of the password with the salt
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

// Method to validate a password
userSchema.methods.validPassword = function(password) {
    // Hash the provided password with the stored salt
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    // Compare the hashed password with the stored hash
    return this.hash === hash;
};

// Method to generate a JSON Web Token (JWT)
userSchema.methods.generateJwt = function() {
    const expiry = new Date(); // Create a new date object for the expiration time
    expiry.setDate(expiry.getDate() + 7); // Set expiration to 7 days from now

    // Sign and return the JWT
    return jwt.sign({
        _id: this.id, // User ID
        email: this.email, // User email
        name: this.name, // User name
        exp: parseInt(expiry.getTime() / 1000, 10), // Expiration time in seconds
    },
    process.env.JWT_SECRET // Secret key for signing the token (loaded from environment variables)
    ); // DO NOT KEEP SECRET IN THE CODE! (for security reasons, keep secrets in environment variables)
};

// Register the schema as a model in Mongoose
mongoose.model("users", userSchema);
