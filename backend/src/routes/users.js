const express = require('express');

const UserController = require('../controller/users.js');

const router = express.Router();

// CREATE - POST
router.get('/', UserController.getAllUsers);
router.post('/add', UserController.createNewUser);
router.post('/delete', UserController.deleteUser);
router.post('/update', UserController.updateUser);





module.exports = router;