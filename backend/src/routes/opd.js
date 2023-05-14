const express = require('express');

const OpdController = require('../controller/opd.js');

const router = express.Router();

// READ - GET
router.get('/', OpdController.getAllOpd);
router.post('/add', OpdController.insertOpd);
router.post('/update', OpdController.updateOpd);
router.post('/delete', OpdController.deleteOpd);

module.exports = router;