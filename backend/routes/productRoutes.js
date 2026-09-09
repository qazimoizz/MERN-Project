const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getNewArrivals,
  getTopSelling,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview
} = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/top-selling', getTopSelling);
router.get('/:id', getProductById);
router.post('/', verifyToken, verifyAdmin, upload.array('images', 5), createProduct);
router.put('/:id', verifyToken, verifyAdmin, upload.array('images', 5), updateProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);
router.post('/:id/reviews', verifyToken, addProductReview);

module.exports = router;

