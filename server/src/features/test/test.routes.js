import express from 'express';
import {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest
} from './test.controller.js';

const router = express.Router();

// Create a new test item
router.post('/', createTest);

// Get all test items
router.get('/', getAllTests);

// Get a single test item by ID
router.get('/:id', getTestById);

// Update a test item
router.put('/:id', updateTest);

// Delete a test item
router.delete('/:id', deleteTest);

export default router;