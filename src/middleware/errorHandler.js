const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
    logger.error('Unhandled error', { error: err && err.message ? err.message : err });
    res.status(500).json({ error: 'Internal Server Error' });
};