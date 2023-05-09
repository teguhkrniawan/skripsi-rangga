const express = require('express');

const AutentikasiController = require('../controller/autentikasi.js');

const router = express.Router();

// CREATE - POST
router.post('/login', AutentikasiController.login);


module.exports = router;