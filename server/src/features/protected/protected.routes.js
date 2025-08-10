import express from 'express';
import { protect, checkAdmin } from '../../middleware/auth.middleware.js';
import { getAiInsight } from '../ai/ai.controller.js';

const router = express.Router();

// @route   GET /api/data/user
// @desc    Get data for a logged-in user
// @access  Private
router.get('/user', protect, (req, res) => {
  res.json({ message: 'This is protected data for regular users.', user: req.user });
});

// @route   GET /api/data/admin
// @desc    Get data for an admin user
// @access  Private (Admin Only)
router.get('/admin', protect, checkAdmin, (req, res) => {
  res.json({ message: 'This is protected data for ADMINS ONLY.', user: req.user });
});

// @route   GET /api/data/ai-insight
// @desc    Get a sample AI insight
// @access  Private
router.get('/ai-insight', protect, getAiInsight);


export default router;