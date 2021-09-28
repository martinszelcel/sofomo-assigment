const dns = require("dns");

async function dnsLookup(hostname) {
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = dnsLookup;