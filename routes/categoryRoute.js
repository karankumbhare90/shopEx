const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createCategoryController, updateCategoryController, allCategoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

// CREATE CATEGORY || POST
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// UPDATE CATEGORY || PUT
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// GET ALL CATEGORY || GET
router.get('/get-category', allCategoryController);

// GET SINGLE CATEGORY || GET
router.get('/single-category/:slug', singleCategoryController);


// DELETE CATEGORY || GET
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);
// router.delete('/delete-category/:slug', requireSignIn, isAdmin, deleteCategoryController); //Using slug

module.exports = router;