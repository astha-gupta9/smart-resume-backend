const config = require('../config/index');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: config.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
            const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
            return `${timestamp} [${level}]: ${message} ${metaStr}`;
        })
    ),
    transports: [new transports.Console()]
});

module.exports = logger;