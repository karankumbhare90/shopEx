require('dotenv').config();
const { default: slugify } = require('slugify');
const { Product } = require("../models/productModel");
const { Category } = require("../models/categoryModel");
const fs = require('fs');
const braintree = require('braintree');
const { Order } = require('../models/orderModel');

// Payment Gateway

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// CREATE PRODUCT
const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });
        if (image && image.size > 1000000) return res.status(400).send({ error: 'Image size should be less than 1MB' });

        // Create the product object
        const product = new Product({
            ...req.fields,
            slug: slugify(name),
        });

        // Handle image
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }

        // Save the product
        await product.save();

        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        console.error('Error while creating product:', error);
        res.status(500).send({
            success: false,
            message: 'Error while creating product',
            error: error.message,
        });
    }
};

// UPDATE PRODUCT
const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });

            case !description:
                return res.status(500).send({ error: 'Desciption is required' });

            case !price:
                return res.status(500).send({ error: 'Price is required' });

            case !category:
                return res.status(500).send({ error: 'Category is required' });

            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' });

            case image && image.size > 1000000:
                return res.status(500).send({ error: 'Image is required and Less Than 1 MB' });
        }
        const product = await Product.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        )

        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: 'Product Updated',
            product,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while updating product',
            error
        })
    }
}

// GET ALL PRODUCTS
const getAllProductController = async (req, res) => {
    try {
        const products = await Product
            .find({})
            .populate('category')
            .select("-image")
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: 'All Products',
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting Products',
            error: error.message
        })
    }
}

// GET SINGLE PRODUCT
const getSingleProductController = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).select('-image').populate('category');

        res.status(200).send({
            success: true,
            message: 'Single Product Fetched',
            product,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting Product',
            error,
        })
    }
}

// GET PRODUCT IMAGE
const productImageController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid).select('image');

        if (product.image.data) {
            res.set('Content-type', product.image.contentType);

            return res.status(200).send(product.image.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting Product Images',
            error,
        })
    }
}

// DELETE PRODUCT
const productDeleteController = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.pid).select('-image');

        res.status(200).send({
            success: true,
            message: 'Product Deleted Successfullly',
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while deleting Product',
            error,
        })
    }
}

const productsFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;

        let args = {};

        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

        const products = await Product.find(args);

        res.status(200).send({
            success: true,
            message: 'Product Filtered Successfullly',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error while Filtering Products',
            error,
        })
    }
}

const searchControlller = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await Product
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};

const relatedProductControlller = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await Product.find({
            category: cid,
            _id: { $ne: pid }
        }).select('-image').limit(3).populate('category');

        res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting related product",
            error,
        });
    }
}

const productCategoryControlller = async (req, res) => {
    try {
        const category = await Category.find({ slug: req.params.slug });
        const products = await Product.find({ category }).populate('category');

        res.status(200).send({
            success: true,
            category,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting products",
            error,
        });
    }
}

// PAYMENT GATEWAY

// TOKEN CONTROLLER | GET
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(result)
            }
        })
    } catch (error) {
        console.log(error);
        /*res.status(400).send({
            success: false,
            message: "Error while getting token",
            error,
        });*/
    }
}

// PAYMENT CONTROLLER | POST
const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonse } = req.body;
        let total = 0;
        cart.map((item) => (
            total += item.price
        ))

        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonse,
                options: {
                    submitForSettlement: true
                },
            },
            function (error, result) {
                if (result) {
                    const order = new Order({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                }
                else {
                    res.status(500).send(error);
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createProductController,
    updateProductController,
    getAllProductController,
    getSingleProductController,
    productImageController,
    productDeleteController,
    productsFilterController,
    searchControlller,
    relatedProductControlller,
    productCategoryControlller,
    braintreeTokenController,
    braintreePaymentController
}