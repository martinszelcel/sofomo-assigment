const express = require("express");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const morganLogger = require("./utils/morganLogger");

const geolocation = require("./routes/geolocation");
const auth = require("./routes/auth");

const app = express();
const port = 5000;

// Check if access token secret is provided
if (!process.env.ACCESS_TOKEN_SECRET) {
    logger.error("Access token secret is missing, please provide it in ACCESS_TOKEN_SECRET enviroment variable")
    process.exit();
}

// Check if refresh token secret is provided
if (!process.env.REFRESH_TOKEN_SECRET) {
    logger.error("Refresh token secret is missing, please provide it in REFRESH_TOKEN_SECRET enviroment variable")
    process.exit();
}

// Check if ipstack.com API key is provided
if (!process.env.IPSTACK_API_KEY) {
    logger.error("ipstack.com API key is missing, please provide it in IPSTACK_API_KEY enviroment variable")
    process.exit();
}

// Database setup
mongoose.connect('mongodb://mongo:27017/app', {useNewUrlParser: true})
    .then(() => logger.info("Connected to MongoDB database"))
    .catch(() => logger.error("Error while connecting to MongoDB database"));

mongoose.connection.on('disconnected', (err) => {
    logger.error(`MongoDB database was disconnected`);
});

mongoose.connection.on('error', (err) => {
    logger.error(`Error while connecting to MongoDB database`);
});

// Load middleware
app.use(express.json());
app.use(morganLogger);

// Start listening
app.listen(port, () => {
    logger.info(`App is listening at http://localhost:${port}`);
});

// Add all routes
app.use('/api/geolocation', geolocation)
app.use('/api/auth', auth);

app.use((req, res, next) => {
    res.status(404).json({
        type: "error",
        message: "This path doesn't exist"
    });
});