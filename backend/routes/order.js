const express = require('express');
const router = express.Router();
const OrderController = require("../controllers/order");
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

router.post('/new', verifyToken , OrderController.newOrder );
router.get('/get/:id',verifyToken,OrderController.getSingleOrder);
router.get('/me',verifyToken,OrderController.myOrders);
router.get('/all',verifyToken, authorizeRoles("admin"),OrderController.getAllOrders);
router.put('/:id',verifyToken, authorizeRoles("admin"), OrderController.updateOrder);
router.delete('/:id',verifyToken, authorizeRoles("admin"), OrderController.deleteOrder);

module.exports = router;
