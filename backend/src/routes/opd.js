const express = require('express');

const OpdController = require('../controller/opd.js');

const router = express.Router();

// READ - GET
router.get('/', OpdController.getAllOpd);

module.exports = router;