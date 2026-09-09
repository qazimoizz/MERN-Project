const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    ratingCount: {
      type: Number,
      default: 0
    },
    images: {
      type: [String],
      required: true,
      default: []
    },
    category: {
      type: String,
      required: true
    },
    dressStyle: {
      type: String,
      enum: ['Casual', 'Formal', 'Party', 'Gym'],
      default: 'Casual'
    },
    sizes: {
      type: [String],
      default: ['Small', 'Medium', 'Large', 'X-Large']
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true }
      }
    ],
    stock: {
      type: Number,
      required: true,
      default: 20
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    isTopSelling: {
      type: Boolean,
      default: false
    },
    reviews: [reviewSchema]
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

