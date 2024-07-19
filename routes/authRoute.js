const express = require('express');
const { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrders, orderStatusController } = require('../controllers/authControllers'); // Adjust the path if necessary
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');


// Router Object
const router = express.Router();

// Routing
// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

// FORGOT PASSWORD
router.post('/forgot-password', forgotPasswordController);

// TEST || GET
router.get('/test', requireSignIn, isAdmin, testController);

// Protected User Route Auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

// Protected Admin Route Auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

// Update Profile
router.put('/profile', requireSignIn, updateProfileController);

// Orders
router.get('/orders', requireSignIn, getOrdersController)

// All Orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrders);

// Order Status
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

module.exports = router;