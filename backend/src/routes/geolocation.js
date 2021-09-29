const express = require('express');
const axios = require("axios");
const Geolocation = require('../models/GeolocationModel');
const logger = require('../utils/logger');
const resolveAddress = require('../services/resolveAdress');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth.required, async (req, res) => {
    try {
        const result = await Geolocation.find();
        res.json(result);
    } catch (error) {
        logger.error(`Error while connecting to MongoDB database\n${error.stack}`);
        res.status(500).json({
            type: "error",
            message: "Error with connection to database, please try again later"
        });
    }
})

router.get('/:address', auth.required, async (req, res) => {
    const address = req.params.address;

    try {
        // Resolve url address to ip adress
        const ip = await resolveAddress(address);

        // Check if data exist in database
        try {
            const result = await Geolocation.findOne({ip});
            if (result) {
                logger.debug(`Using data from database for adress ${ip}`)
                res.json(result);
                return;
            }
        } catch (error) {
            logger.error("Error while connecting to MongoDB database, ipstack.com API will be used instead");
        }

        // If no data in database, get data from API
        logger.debug(`Using data from ipstack.com API for adress ${ip}`)

        axios.get(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`)
            .then(async (response) => {
                if (!response.data.error) {
                    // Create data object
                    const geolocationData = {
                        ip: ip,
                        geolocationData: response.data
                    };
        
                    // Save data in db
                    try {
                        await new Geolocation(geolocationData).save();
                    } catch (error) {
                        logger.error("Error while connecting to MongoDB database, data will be not saved");
                    }
        
                    // Send data to client
                    res.json(geolocationData);

                } else {
                    logger.error(`Error from ipstack.com API: ${response.data.error.info}`);
                    res.status(500).json({
                        type: "error",
                        message: "Error with ipstack.com API, please try again later"
                    });
                }
            
            })
            .catch(() => {
                const message = "Error connecting to ipstack.com API, please try again later"

                logger.error(message)
                res.status(500).json({
                    type: "error",
                    message: message
                });
            });

    } catch (error) {
        logger.error("Error while resolving ip address");
        res.status(422).json({
            type: "info",
            message: "Please provide a vaild address"
        })
    }
});

router.put('/:address', auth.required, async (req, res) => {
    const address = req.params.address;
    const geolocationData = req.body;

    try {
        // Resolve url address to ip adress
        const ip = await resolveAddress(address);

        // Find and replace object data in db
        try {
            const result = await Geolocation.findOne({ip});
            if (result) {
                result.geolocationData = geolocationData;
                await result.save();
                res.json(result);

            } else {
                try {
                    const geolocation = await new Geolocation({
                        ip,
                        geolocationData
                    }).save();
                    res.json(geolocation);

                } catch (error) {
                    logger.error("Error while connecting to MongoDB database, data will be not saved");
                }
            }
        } catch (error) {
            logger.error("Error while connecting to MongoDB database.");
        }
    } catch (error) {
        logger.error("Error while resolving ip address");
        res.status(422).json({
            type: "info",
            message: "Please provide a vaild address"
        });
    }
});

router.post('/:address', auth.required, async (req, res) => {
    const address = req.params.address;
    const geolocationData = req.body;

    try {
        // Resolve url address to ip adress
        const ip = await resolveAddress(address);

        // Create object in database if already doesn't exists
        try {
            const result = await Geolocation.findOne({ip});
            if (!result) {
                try {
                    const geolocation = await new Geolocation({
                        ip,
                        geolocationData
                    }).save();
                    res.json(geolocation);

                } catch (error) {
                    logger.error("Error while connecting to MongoDB database, data will be not saved");
                }
            } else {
                res.status(409).json({
                    type: "info",
                    message: "Object with this IP adress already exist in database",
                    data: result.geolocationData
                });
            }
        } catch (error) {
            logger.error("Error while connecting to MongoDB database.");
        }
    } catch (error) {
        logger.error("Error while resolving ip address");
        res.status(422).json({
            type: "info",
            message: "Please provide a vaild address"
        });
    }
});

router.delete('/:address', auth.required, async (req, res) => {
    const address = req.params.address;

    try {
        // Resolve url address to ip adress
        const ip = await resolveAddress(address);

        // Find and remove object in db
        try {
            const result = await Geolocation.findOne({ip});
            if (result) {
                try {
                    await Geolocation.deleteOne({ip})
                    res.json({
                        type: "info",
                        message: "Object with this IP was successfully removed",
                    });

                } catch (error) {
                    logger.error("Error while connecting to MongoDB database, data will be not saved");
                }
            } else {
                res.status(404).json({
                    type: "info",
                    message: "Object with this IP adress doesn't exist",
                });
            }
        } catch (error) {
            logger.error("Error while connecting to MongoDB database.");
        }
    } catch (error) {
        logger.error("Error while resolving ip address");
        res.status(422).json({
            type: "info",
            message: "Please provide a vaild address"
        });
    }
})

module.exports = router;