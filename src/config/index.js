module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/smart_resume_dev',
  NODE_ENV: process.env.NODE_ENV || 'development'
};