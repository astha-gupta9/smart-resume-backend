const config = require('../config/index');

exports.getHealth = (req, res) => {
    res.json({
        status: 'OK',
        env: config.NODE_ENV || 'development',
        time: new Date().toISOString()
    });
};