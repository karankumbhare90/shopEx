import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart'
import './Products.css';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // Get All Products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    // Lifecycle method
    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <Layout title={'Products | ShopEx'}>
            <div className='container-fluid'>
                <div className="row create-category">
                    <div className="col-md-3 filters mar">
                        <AdminMenu />
                    </div>
                    <div className="col-md-8 products centers">
                        <h1 className="text-center heading">All Products</h1>
                        <div className="d-flex flex-wrap centers">
                            {products?.map((product) => (
                                <Link to={`/dashboard/admin/product/${product.slug}`} key={product._id} className='product-link' style={{ textDecoration: 'none' }}>
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
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products