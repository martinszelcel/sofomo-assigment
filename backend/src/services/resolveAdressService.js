const logger = require("../utils/logger");
const dns = require("dns");

async function dnsLookup(hostname) {
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, result) => {
            if (err) {
                logger.error(err.stack);
                reject(err);
            }

            resolve(result);
        });
    });
}

async function resolveAddress(address) {
    return new Promise(async (resolve, reject) => {
        // Find only hostname if whole URL was provided
        const hostname = address.split('/').filter(string => string.indexOf(".") != -1)[0];

        // Get ip address if hostname is provided (provided ip address is not affected)
        try {
            const ip = await dnsLookup(hostname);
            logger.debug(`Resolved: ${address} -> ${hostname} -> ${ip}`);
    
            if (!ip) reject("Error while resolving IP address");

            resolve(ip);
        } catch (error) {
            logger.error(error);
            reject("Error while resolving IP address");
        }
    });
}

module.exports = {
    dnsLookup,
    resolveAddress
};