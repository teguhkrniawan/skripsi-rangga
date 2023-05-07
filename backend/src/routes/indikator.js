const express = require('express');

const IndikatorController = require('../controller/indikator.js');

const router = express.Router();

// READ - GET
router.get('/', IndikatorController.getAllIndikator);

module.exports = router;