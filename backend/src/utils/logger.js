const winston = require("winston");
const morgan = require("morgan");

const format = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
  });

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/errors.txt', level: 'error' }),
        new winston.transports.File({ filename: 'logs/logs.txt' })
    ]
});

module.exports = logger;