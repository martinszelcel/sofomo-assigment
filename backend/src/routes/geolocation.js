const express = require('express');
const axios = require("axios");

const router = express.Router();

const apiKey = process.env.IPSTACK_API_KEY

router.get('/', (req, res) => {
    const address = req.body.address;

    if (!address || address.length == 0) {}

    axios.get(`http://api.ipstack.com/${address}?access_key=${apiKey}`)
        .then((response) => {
            res.json(response.data)
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