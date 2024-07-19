import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { Select } from 'antd'
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDesciption] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [image, setImage] = useState('');
    const [id, setId] = useState("")

    const navigate = useNavigate();
    const params = useParams();

    // get All Categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');

            if (data?.success) {
                setCategories(data?.allCategories);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    }

    // Update Product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            image && productData.append("image", image);
            productData.append("category", category);
            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (data?.success) {
                toast.success('Product Updated Successfully');
                navigate('/dashboard/admin/products');
            }
            else {
                toast.error(data?.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    // Delete Product
    const handleDeleteProduct = async () => {
        try {
            // let deletePromp = prompt('Are you sure want to delete ?', "Type Yes or No");
            // eslint-disable-next-line no-restricted-globals
            let deletePrompt = confirm('Are you sure you want to delete this item?');

            if (!deletePrompt) return;
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
            if (data?.success) {
                toast.success('Product Deleted Successfully');
                navigate('/dashboard/admin/products');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    // Get Single Product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setDesciption(data.product.description);
            setPrice(data.product.price);
            setId(data.product._id);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, [])


    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <Layout title={'Update Product | ShopEx'}>
            <div className="container-fluid">
                <div className="row create-category">
                    <div className="col-md-3 filters mar">
                        <AdminMenu />
                    </div>
                    <div className="col-md-8 category-details">
                        <h1>Update Product</h1>
                        <div className="form-container">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className='form-select'
                                onChange={(value) => { setCategory(value) }}
                                value={category}
                            >
                                {categories.map((item) => (
                                    <Option key={item._id} value={item._id}>{item.name}</Option>
                                ))}
                            </Select>
                            <div className="">
                                <label className='btn-up'>
                                    {image ? image.name : "Upload image"}
                                    <input type="file" name="image" accept='image/*' onChange={(e) => setImage(e.target.files[0])} hidden />
                                </label>
                            </div>

                            <div className="">
                                {image ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(image)} alt={image.name} height={'200px'} className='img img-responsive' />
                                    </div>
                                ) :
                                    <div className="text-center">
                                        <img src={`/api/v1/product/product-image/${id}`} alt={image.name} height={'200px'} className='img img-responsive' />
                                    </div>
                                }
                            </div>

                            <div className="">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder='Write a Product Name'
                                    className='input-form'
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                            <div className="">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder='Write a Product Description'
                                    className='input-form'
                                    onChange={(e) => { setDesciption(e.target.value) }}
                                >

                                </textarea>
                            </div>
                            <div className="">
                                <input
                                    type="text"
                                    value={price}
                                    placeholder='Write a Product Price'
                                    className='input-form'
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                            </div>
                            <div className="">
                                <input
                                    type="text"
                                    value={quantity}
                                    placeholder='Write a Product Quantity'
                                    className='input-form'
                                    onChange={(e) => { setQuantity(e.target.value) }}
                                />
                            </div>
                            <div className="">
                                <Select
                                    bordered={false}
                                    size='large'
                                    showSearch
                                    placeholder='Select Shipping'
                                    className='input-form'
                                    onChange={(value) => { setShipping(value) }}
                                    value={shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>

                            <div className="">
                                <button className="btn-u pu btn-primary mb-2" onClick={handleUpdateProduct}>Update Product</button>
                                <button className="btn-u pd btn-danger" onClick={handleDeleteProduct}>Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default UpdateProduct