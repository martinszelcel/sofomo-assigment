const express = require("express");
const logger = require("./utils/logger");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Load variables from .env file
require("dotenv").config();

const geolocation = require("./routes/geolocation");

const app = express();
const port = 5000;

mongoose.connect('mongodb://mongo:27017/app', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('disconnected', err => {
    logger.error(`MongoDB database was disconnected`);
});

mongoose.connection.on('error', err => {
    logger.error(`Error while connecting to mongoDB database`);
});

app.use(express.json());

app.listen(port, () => {
    logger.info(`App is listening at http://localhost:${port}`);
});

app.use(morgan('short', {
    stream: {
        write: (message) => {
            logger.info(message.substring(0,message.lastIndexOf('\n')));
        }
    }
}));

app.use('/geolocation', geolocation)

app.use((req, res, next) => {
    res.status(404).json({
        type: "error",
        message: "This path doesn't exist"
    });
});