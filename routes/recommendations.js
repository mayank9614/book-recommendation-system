const express = require('express');
const router = express.Router();
const {
  getRecommendations,
  getSimilarBooks,
} = require('../controllers/recommendationController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/similar/:bookId', getSimilarBooks);

// Protected routes
router.get('/', protect, getRecommendations);

module.exports = router; 