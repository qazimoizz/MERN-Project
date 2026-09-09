const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getAdminStats
} = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

router.post('/', verifyToken, createOrder);
router.get('/my-orders', verifyToken, getMyOrders);
router.get('/admin/all', verifyToken, verifyAdmin, getAllOrders);
router.get('/admin/stats', verifyToken, verifyAdmin, getAdminStats);
router.put('/:id/status', verifyToken, verifyAdmin, updateOrderStatus);
router.get('/:id', verifyToken, getOrderById);

module.exports = router;

