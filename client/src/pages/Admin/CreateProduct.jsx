import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import './CreateProduct.css'
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [image, setImage] = useState(null);

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.allCategories);
            }
        } catch (error) {
            console.error("Error getting categories:", error);
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Create product function
    const handleCreate = async (e) => {
        e.preventDefault();

        if (image && image.size > 1024 * 1024) { // 1 MB in bytes
            alert("Image size should be less than 1MB");
            return;
        }

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            if (image) productData.append("image", image);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const { data } = await axios.post(
                "/api/v1/product/create-product",
                productData
            );
            if (data?.success) {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid">
                <div className="row create-category">
                    <div className="col-md-3 filters mar">
                        <AdminMenu />
                    </div>
                    <div className="col-md-8 category-details">
                        <h1>Create Product</h1>
                        <div className="form-container">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select"
                                onChange={(value) => setCategory(value)}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="">
                                <label className="btn-up">
                                    {image ? image.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="">
                                {image && (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write a name"
                                    className="input-form"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Write a description"
                                    className="input-form"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Write a Price"
                                    className="input-form"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Write a quantity"
                                    className="input-form"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    showSearch
                                    className="form-select"
                                    onChange={(value) => setShipping(value)}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="">
                                <button className="btn-u btn-primary" onClick={handleCreate}>
                                    Create Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
