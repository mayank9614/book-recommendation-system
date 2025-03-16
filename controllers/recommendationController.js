const Book = require('../models/Book');
const User = require('../models/User');

// @desc    Get book recommendations for a user
// @route   GET /api/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Basic recommendation based on user preferences
    // This will be enhanced with more sophisticated algorithms in future phases
    let recommendations = [];

    // If user has genre preferences, recommend books from those genres
    if (user.preferences && user.preferences.genres && user.preferences.genres.length > 0) {
      const genreRecommendations = await Book.find({
        genres: { $in: user.preferences.genres },
      })
        .limit(5)
        .sort({ averageRating: -1 });

      recommendations = [...recommendations, ...genreRecommendations];
    }

    // If user has author preferences, recommend books from those authors
    if (user.preferences && user.preferences.authors && user.preferences.authors.length > 0) {
      const authorRecommendations = await Book.find({
        author: { $in: user.preferences.authors },
      })
        .limit(5)
        .sort({ averageRating: -1 });

      // Add only unique books
      authorRecommendations.forEach((book) => {
        if (!recommendations.find((b) => b._id.toString() === book._id.toString())) {
          recommendations.push(book);
        }
      });
    }

    // If we still don't have enough recommendations, add some highly rated books
    if (recommendations.length < 10) {
      const topRatedBooks = await Book.find()
        .limit(10 - recommendations.length)
        .sort({ averageRating: -1 });

      // Add only unique books
      topRatedBooks.forEach((book) => {
        if (!recommendations.find((b) => b._id.toString() === book._id.toString())) {
          recommendations.push(book);
        }
      });
    }

    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get similar books
// @route   GET /api/recommendations/similar/:bookId
// @access  Public
exports.getSimilarBooks = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Find books with similar genres
    const similarBooks = await Book.find({
      _id: { $ne: book._id }, // Exclude the current book
      genres: { $in: book.genres },
    })
      .limit(5)
      .sort({ averageRating: -1 });

    res.json({
      success: true,
      count: similarBooks.length,
      data: similarBooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 