const { verifyAccessToken } = require("../services/jsonWebTokenService");

module.exports = {
    required: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
            res.sendStatus(401);
            return;
        }
    
        verifyAccessToken(token)
            .then(decoded => {
                req.tokenData = decoded;
                next()
            })
            .catch(error => {
                res.sendStatus(401);
            });
    },
    optional: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
            next()
            return;
        }
    
        verifyAccessToken(token)
            .then(decoded => {
                req.tokenData = decoded;
                next()
            })
            .catch(error => {
                next();
            });
    },
}