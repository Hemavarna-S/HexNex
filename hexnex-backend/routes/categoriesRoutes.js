const express = require('express');
const router = express.Router();
const { categoriesFeedback } = require('../controllers/categoriesController');

// Change the route path to match what frontend calls
router.post('/ai/hexnexai', categoriesFeedback);

module.exports = router;
