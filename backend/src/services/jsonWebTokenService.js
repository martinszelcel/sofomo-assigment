const jwt = require('jsonwebtoken');

async function createAccessAndRefreshToken(userId, email) {
    return new Promise((resolve, reject) => {
        const tokenData = {
            userId,
            email       
        };
    
        jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, (err, accessToken) => {
            if (err) return reject(err);

            jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '0.5y' }, (err, refreshToken) => {
                if (err) return reject(err);

                resolve({
                    accessToken,
                    refreshToken
                });
            });
        });
    });
}

async function verifyAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

async function verifyRefreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

module.exports = {
    createAccessAndRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};