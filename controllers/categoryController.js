require('dotenv').config();
const { default: slugify } = require('slugify');
const { Category } = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }

        const existingCategory = await Category.findOne({ name })

        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
            })
        }

        const newCategory = await new Category({ name, slug: slugify(name) }).save();

        res.status(200).send({
            success: true,
            message: "Category is Created",
            newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in category",
            error
        })
    }
}


const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        res.status(200).send({
            success: true,
            message: "Category Updated",
            updatedCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating category",
            error
        })
    }
}

const allCategoryController = async (req, res) => {
    try {
        const allCategories = await Category.find({});

        res.status(200).send({
            success: true,
            message: "All Category List",
            allCategories
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error
        })
    }
}

const singleCategoryController = async (req, res) => {
    try {
        const singleCategory = await Category.findOne({ slug: req.params.slug });

        res.status(200).send({
            success: true,
            message: "Get Single Category",
            singleCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error
        })
    }
}


const deleteCategoryController = async (req, res) => {
    try {
        await Category.findByIdAndDelete({ _id: req.params.id });
        // await Category.findOneAndDelete({ slug: req.params.slug }); // Using Slug

        res.status(200).send({
            success: true,
            message: "Category Deleted",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error
        })
    }
}



module.exports = {
    createCategoryController,
    updateCategoryController,
    allCategoryController,
    singleCategoryController,
    deleteCategoryController,
}