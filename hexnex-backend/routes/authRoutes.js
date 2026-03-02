import express from 'express';
import { registerUser, loginUser, completeRoom, completeWalkthrough, getMyProgress } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Progress endpoints
router.post('/progress/complete-room', protect, completeRoom);
router.post('/progress/complete-walkthrough', protect, completeWalkthrough);
router.get('/progress/me', protect, getMyProgress);

export default router;