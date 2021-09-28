const express = require('express');
const axios = require("axios");
const dnsLookup = require('../services/dnsLookup');
const Geolocation = require('../models/GeolocationModel');
const logger = require('../utils/logger');

const router = express.Router();

const apiKey = process.env.IPSTACK_API_KEY

router.get('/', async (req, res) => {
    const address = req.body.address;

    if (!address || address.length == 0) {
        res.status(422);
        res.json({
            type: "info",
            message: "Please provide address to check"
        })
    }

    // Find only hostname if whole URL was provided
    const hostname = address.split('/').filter(string => string.indexOf(".") != -1)[0];

    // Get ip address if hostname is provided (provided ip address is not affected)
    const ip = await dnsLookup(hostname);

    logger.debug(`Resolved: ${address} -> ${hostname} -> ${ip}`);

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

    axios.get(`http://api.ipstack.com/${ip}?access_key=${apiKey}`)
        .then(async (response) => {
            if (!response.data.error) {
                const geolocationData = {
                    ip: ip,
                    geolocationData: response.data
                }
    
                // Save data in db
                try {
                    const geolocation = await new Geolocation(geolocationData).save();
                } catch (error) {
                    logger.error("Error while connecting to MongoDB database, data will be not saved");
                }
    
                // Send data to client
                res.json(geolocationData);

            } else {
                logger.error(`Error from ipstack.com API: ${response.data.error.info}`)
                res.status(500);
                res.json({
                    type: "error",
                    message: "Error with ipstack.com API, try again later"
                });
            }
           
        })
        .catch(() => {
            const message = "Error connecting to ipstack.com API"

            logger.error(message)
            res.status(500);
            res.json({
                type: "error",
                message: message
            });
        });
});

module.exports = router;