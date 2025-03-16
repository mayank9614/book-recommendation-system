const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  addRating,
} = require('../controllers/bookController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getBooks);
router.get('/:id', getBook);

// Protected routes
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);
router.post('/:id/ratings', protect, addRating);

module.exports = router; 