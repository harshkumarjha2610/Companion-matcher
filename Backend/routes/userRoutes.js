const express = require('express');
const router = express.Router();
const { createUser, getMatches, shortlistUser } = require('../controllers/userController');
const validateUser = require('../Middleware/validateuser');

// Routes
router.post('/users', validateUser, createUser);
router.get('/matches/:username', getMatches);
router.post('/shortlist/:username/:targetUsername', shortlistUser);

module.exports = router;