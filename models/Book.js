const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    isbn: {
      type: String,
      unique: true,
    },
    publishedDate: {
      type: Date,
    },
    publisher: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    genres: {
      type: [String],
      required: true,
    },
    coverImage: {
      type: String,
      default: 'no-image.jpg',
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0,
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        review: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    similarBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Calculate average rating when ratings are modified
BookSchema.pre('save', function (next) {
  if (this.ratings.length > 0) {
    this.averageRating =
      this.ratings.reduce((acc, item) => item.rating + acc, 0) /
      this.ratings.length;
  } else {
    this.averageRating = 0;
  }
  next();
});

module.exports = mongoose.model('Book', BookSchema); 