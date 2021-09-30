const logger = require("../utils/logger");
const axios = require("axios");

function getGeolocationData(ip) {
    return new Promise((resolve, reject) => {
        axios.get(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`).then(response => {
            if (!response.data.error) {

                // Create data object
                const geolocationData = {
                    ip: ip,
                    city: response.data.city,
                    continent: response.data.continent_name,
                    country: response.data.country_name,
                    region: response.data.region_name,
                    zip: response.data.zip,
                    callingCode: response.data.location.calling_code,
                    capital: response.data.location.capital,
                    countryFlag: response.data.location.country_flag_emoji,
                };

                resolve(geolocationData);
            } else {
                logger.error(`Error from ipstack.com API: ${response.data.error.info}`);
                reject(response.data.error.info);
            }
        }).catch(error => {
            logger.error(error);
            reject(error);
        });
    });
}


module.exports = {
    getGeolocationData
}