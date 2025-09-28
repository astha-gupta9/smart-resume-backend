const express = require('express');
const router = express.Router();
const { listCandidatesForRecruiter } = require('../controllers/candidateController');

router.get('/candidates', listCandidatesForRecruiter);

module.exports = router;