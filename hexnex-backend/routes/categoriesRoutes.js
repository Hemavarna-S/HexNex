import express from 'express';
import { categoriesFeedback } from '../controllers/categoriesController.js';

const router = express.Router();

// Change the route path to match what frontend calls
router.post('/ai/hexnexai', categoriesFeedback);

export default router;
