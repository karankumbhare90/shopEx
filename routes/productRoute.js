const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createProductController, updateProductController, getSingleProductController, getAllProductController, productImageController, productDeleteController, productsFilterController, searchControlller, relatedProductControlller, productCategoryControlller, braintreeTokenController, braintreePaymentController } = require('../controllers/productController');
const formidable = require('express-formidable');

const router = express.Router();

// CREATE PRODUCT || POST
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// UPDATE PRODUCT || POST
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// GET ALL PRODUCTS || GET
router.get('/get-product', getAllProductController);

// GET SINGLE PRODUCTS || GET
router.get('/get-product/:slug', getSingleProductController);

// GET PRODUCT IMAGE || GET
router.get('/product-image/:pid', productImageController);

// DELETE PRODUCT || DELETE
router.delete('/delete-product/:pid', productDeleteController);

// FILTER PRODUCTS || GET
router.post('/product-filter', productsFilterController);

// SEARCH PRODUCTS || GET
router.get('/search/:keyword', searchControlller);

// RELATED PRODUCTS || GET
router.get('/related-product/:pid/:cid', relatedProductControlller);

// CATEGORY WISE PRODUCTS || GET
router.get('/product-category/:slug', productCategoryControlller);

// Payment Routes
// GET TOKEN
router.get('/braintree/token', braintreeTokenController);

// PAYMENT 
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

module.exports = router;