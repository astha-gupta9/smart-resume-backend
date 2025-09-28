const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./utils/logger');
const healthRoutes = require('./routes/health');
const candidateRoutes = require('./routes/candidates');
const recruiterRoutes = require('./routes/recruiters');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

app.use('/health', healthRoutes);
app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/recruiters', recruiterRoutes);

app.get('/', (req, res) => res.json({ message: 'Smart Resume Screening' }));

app.use(errorHandler);

module.exports = app;