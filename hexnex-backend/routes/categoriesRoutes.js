import express from 'express';
import { categoriesFeedback } from '../controllers/categoriesController.js';

const router = express.Router();

// Route used by frontend
router.post('/ai/hexnexai', categoriesFeedback);

export default router;
