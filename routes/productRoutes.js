// routes/productRoutes.js 
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); 

// Rutas públicas (no requieren token)
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas (requieren token válido en Authorization header)
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.patch('/:id', authMiddleware, productController.patchProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
