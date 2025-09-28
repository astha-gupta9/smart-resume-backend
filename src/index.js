require('dotenv').config();
const config = require('./config');
const db = require('./config/db');
const logger = require('./utils/logger');
const app = require('./app');

const PORT = config.PORT || 5000;

(async () => {
  try {
    await db.connect();
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT} (env=${config.NODE_ENV})`);
    });

    const shutdown = async () => {
      logger.info('Shutting down server...');
      server.close(async () => {
        await db.disconnect();
        logger.info('Server has been shut down.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    logger.error('Error starting the server:', err);
    process.exit(1);
  }
})();