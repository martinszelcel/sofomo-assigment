const express = require("express");
const mongoose = require("mongoose");

// Load variables from .env file
require("dotenv").config();

const logger = require("./utils/logger");
const morganLogger = require("./utils/morganLogger");

const geolocation = require("./routes/geolocation");

const app = express();
const port = 5000;

mongoose.connect('mongodb://mongo:27017/app', {useNewUrlParser: true})
    .then(() => logger.info("Connected to MongoDB database"))
    .catch(() => logger.error("Error while connecting to MongoDB database"));

mongoose.connection.on('disconnected', (err) => {
    logger.error(`MongoDB database was disconnected`);
});

mongoose.connection.on('error', (err) => {
    logger.error(`Error while connecting to MongoDB database`);
});

app.use(express.json());

app.listen(port, () => {
    logger.info(`App is listening at http://localhost:${port}`);
});

app.use(morganLogger);

app.use('/geolocation', geolocation)

app.use((req, res, next) => {
    res.status(404).json({
        type: "error",
        message: "This path doesn't exist"
    });
});