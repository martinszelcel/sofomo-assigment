const express = require('express');
const axios = require("axios");
const Geolocation = require('../models/GeolocationModel');
const logger = require('../utils/logger');
const { resolveAddress } = require('../services/resolveAdressService');
const auth = require('../middleware/auth');
const ipStackApiService = require('../services/ipStackApiService');

const router = express.Router();

router.get('/', auth.required, (req, res) => {
    Geolocation.find().then(result => {
        res.json(result);
    }).catch(error => {
        logger.error(`Error while connecting to MongoDB database\n${error.stack}`);
        res.status(500).json({
            type: "error",
            message: "Error with connection to database, please try again later"
        });
    });
});

router.get('/:address(*)', auth.required, (req, res) => {
    const address = req.params.address;

    // Resolve url address to ip adress
    resolveAddress(address).then(ip => {

        // Check if data exist in database
        Geolocation.findOne({ip}).then(result => {
            if (result) {
                logger.debug(`Using data from database for adress ${ip}`)
                res.json(result);
                return;
            } else {
                // If no data in database, get data from API
                logger.debug(`Using data from ipstack.com API for adress ${ip}`);

                ipStackApiService.getGeolocationData(ip).then(geolocationData => {

                    // Save data in db
                    const geolocation = new Geolocation(geolocationData);
                    
                    geolocation.save().then(savedGeolocation => {
                        res.json(savedGeolocation);
                    }).catch(error => {
                        logger.error("Error while connecting to MongoDB database, data will be not saved");
                        res.json(geolocationData);
                    });

                }).catch(error => {
                    logger.error(error);
                    res.status(500).json({
                        type: "error",
                        message: "Error with ipstack.com API, please try again later"
                    });
                });
            }
        })
        .catch(error => {
            logger.error("Error while connecting to MongoDB database");
            res.status(500).json({
                type: "error",
                message: "Error with connection to database, please try again later"
            });
        });

    })
    .catch(error => {
        logger.error("Error while resolving ip address");
        res.status(422).json({
            type: "info",
            message: "Please provide a vaild address"
        });
    });
});

router.put('/:address(*)', auth.required, (req, res) => {
    const address = req.params.address;
    const geolocationData = req.body;

    // Resolve url address to ip adress
    resolveAddress(address).then(ip => {

        // Make sure the same ip is set in geolocation data
        geolocationData.ip = ip;

        // Find and replace object data in db
        Geolocation.findOne({ip}).then(result => {
            if (result) {
                
                // If object exists update and save
                result.set(geolocationData);

                result.save().then(savedGeolocation => {
                    res.json(savedGeolocation);
                }).catch(error => {
                    logger.error(error);
                    res.status(500).json({
                        type: "error",
                        message: "Error while connecting to MongoDB database, please try again later"
                    });
                });

            } else {
                // If object doesn't exist create new and save
                const newGeolocation = new Geolocation(geolocationData);

                newGeolocation.save().then(savedGeolocation => {
                    res.json(savedGeolocation);
                }).catch(error => {
                    logger.error(error);
                    res.status(500).json({
                        type: "error",
                        message: "Error while connecting to MongoDB database, please try again later"
                    });
                });
            }
            
        });

    }).catch(error => {
        logger.error("Error while resolving ip address");
        res.status(422).json({
            type: "info",
            message: "Please provide a vaild address"
        });
    })
});

router.post('/:address(*)', auth.required, (req, res) => {
    const address = req.params.address;
    const geolocationData = req.body;

    // Resolve url address to ip adress
    resolveAddress(address).then(ip => {

        // Make sure the same ip is set in geolocation data
        geolocationData.ip = ip;

        // Check if object with this ip doesn't already exist
        Geolocation.findOne({ip}).then(result => {
            if (result) {
                res.status(409).json({
                    type: "info",
                    message: "Object with this IP adress already exist in database",
                    data: result.geolocationData
                });
            } else {
                // Object doesn't exist, create new one and save
                const geolocation = new Geolocation(geolocationData);
                
                geolocation.save().then(savedGeolocation => {
                    res.json(savedGeolocation);
                }).catch(error => {
                    logger.error(error);
                    res.status(500).json({
                        type: "error",
                        message: "Error while connecting to MongoDB database, please try again later"
                    });
                });
            }
        }).catch(error => {
            logger.error(error);
            res.status(500).json({
                type: "error",
                message: "Error while connecting to MongoDB database, please try again later"
            });
        });
    }).catch(error => {
        logger.error("Error while resolving ip address");
        res.status(422).json({
            type: "info",
            message: "Please provide a vaild address"
        });
    });
});

router.delete('/:address(*)', auth.required, async (req, res) => {
    const address = req.params.address;

    // Resolve url address to ip adress
    resolveAddress(address).then(ip => {
        // Find and remove object from db
        Geolocation.findOne({ip}).then(result => {

            if (result) {
                Geolocation.deleteOne({ip}).then(() => {
                    res.json({
                        type: "info",
                        message: "Object with this IP was successfully removed",
                    });
                }).catch(error => {
                    logger.error(error);
                    res.status(500).json({
                        type: "error",
                        message: "Error while connecting to MongoDB database, please try again later"
                    });
                });

            } else {
                res.status(404).json({
                    type: "info",
                    message: "Object with this IP adress doesn't exist",
                });
            }

        }).catch(error => {
            logger.error(error);
            res.status(500).json({
                type: "error",
                message: "Error while connecting to MongoDB database, please try again later"
            });
        });

    }).catch(error => {
        logger.error("Error while resolving ip address");
        res.status(422).json({
            type: "info",
            message: "Please provide a vaild address"
        });
    });
});

module.exports = router;