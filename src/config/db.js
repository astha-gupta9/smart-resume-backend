const mongoose = require('mongoose');
const config = require('./index');
const logger = require('../utils/logger');

let isConnected = false;

async function connect() {
  if (isConnected) return mongoose.connection;
  const uri = config.MONGO_URI;
  logger.info(`Connecting to MongoDB at ${uri}...`);
  await mongoose.connect(uri);
  isConnected = true;
  logger.info('Connected to MongoDB');
  return mongoose.connection;
}

async function disconnect() {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
  logger.info('Disconnected from MongoDB');
}

module.exports = { connect, disconnect };