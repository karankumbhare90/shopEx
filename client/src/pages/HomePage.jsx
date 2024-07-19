import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd'
import Prices from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'sonner';
import eCommerce from '../assets/e-commerce.jpg'
import './HomePage.css'

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // get All Categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');

            if (data?.success) {
                setCategories(data?.allCategories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get Products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    }

    // Get Filtered Products

    const filteredProducts = async () => {
        try {
            const { data } = await axios.post('api/v1/product/product-filter', { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    // Filter By Category
    const handleFilter = (value, id) => {
        let all = [...checked];

        if (value) {
            all.push(id)
        }
        else {
            all = all.filter((item) => item !== id);
        }

        setChecked(all);
    }

    useEffect(() => {
        if (!checked.length || !radio.length) {
            getAllProducts();
        }
        getAllCategories();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (checked.length || radio.length) {
            filteredProducts();
        }
    }, [checked, radio])


    return (
        <Layout title={'All Products | Best Offer | ShopEx'}>
            <div className="container-fluid home-container">
                <div className="image-section">
                    <img src={eCommerce} alt="ShopEx Market" />
                    <div className="description">
                        <h1 className="slogan">Everything You Love, All in One Place</h1>
                        <p className="para">Welcome to ShopEx, your ultimate online shopping destination. Discover a wide range of products from top brands, all in one convenient place. Whether you're looking for the latest fashion trends, cutting-edge electronics, home essentials, or unique gifts, we've got you covered. Enjoy a seamless shopping experience with easy navigation, secure payments, and fast shipping. Shop smart, shop easy with ShopEx Site Name today!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 filters">
                        {/* Filter By Category */}
                        <h4 className="text-left heading">Filter By Category</h4>
                        <div className="d-flex flex-column items">
                            {categories?.map((category) => (
                                <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>
                                    {category.name}
                                </Checkbox>
                            ))}
                        </div>

                        {/* Filter By Price */}
                        <h4 className="text-left heading">Filter By Price</h4>
                        <div className="d-flex flex-column items last-items">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {
                                    Prices?.map((price) => (
                                        <div key={price._id}>
                                            <Radio value={price.array}>{price.name}</Radio>
                                        </div>
                                    ))
                                }
                            </Radio.Group>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="btn btn-warning" onClick={() => window.location.reload()}>Reset Filter</div>
                        </div>
                    </div>
                    <div className="col-md-9 products">
                        <h1 className="text-center heading">All Products</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map((product) => (
                                <div className="card">
                                    <div className="card-img">
                                        <img src={`/api/v1/product/product-image/${product._id}`} alt={product.name} />

                                    </div>
                                    <div className="card-body">
                                        <div className="card-des">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-price">${product.price}</p>
                                        </div>
                                        <p className="card-text">{product.description.substring(0, 30)}...</p>
                                        <div className="btns">
                                            <button className="btn btn-primary" onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => {
                                                    setCart([...cart, product]);
                                                    localStorage.setItem('cart', JSON.stringify([...cart, product]));
                                                    toast.success('Item Added To Cart')
                                                }}
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default HomePage
