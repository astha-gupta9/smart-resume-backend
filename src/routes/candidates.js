const express = require('express');
const router = express.Router();
const { connectConsent } = require('../controllers/candidateController');

router.post('/:id/connect-consent', connectConsent);

module.exports = router;