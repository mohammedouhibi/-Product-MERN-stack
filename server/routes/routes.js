const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Enregistrement d'un produit
router.post('/AddProduct', productController.createProduct);

// Modification d'un produit
router.put('/products/:id', productController.updateProduct);

// Affichage d'un produit
router.get('/products/:id', productController.getProduct);

// Affichage de la liste des produits
router.get('/products', productController.getAllProducts);

// Suppression d'un produit
router.delete('/products/:id', productController.deleteProduct);

// Recherche d'un produit par nom
router.get('/search', productController.searchProduct);

module.exports = router;
