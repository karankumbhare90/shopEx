import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import { toast } from 'sonner'
import './ProductDetail.css'

const ProductDetail = () => {

    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([]);
    const params = useParams();
    const [cart, setCart] = useCart()
    const navigate = useNavigate();

    // get Products
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProducts(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    // get Similar Products
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    // get initial details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])


    return (
        <Layout title={'Product Details | ShopEx'}>
            <div className="container-fl">
                <div className="row product-container">
                    <div className="col-md-4 img-container">
                        <img src={`/api/v1/product/product-image/${product._id}`} height={'300px'} width={'200px'} style={{ objectFit: 'contain' }} className="card-img-top" alt={product.name} />
                    </div>
                    <div className="col-md-8">
                        <h1 className='text-center head-text'>Product Details</h1>
                        <h6>Name : {product.name}</h6>
                        <h6>Description : {product.description}</h6>
                        <h6>Price : {product.price}</h6>
                        <h6>Category : {product?.category?.name}</h6>
                        <button className="btn btns btn-warning">Add To Cart</button>
                    </div>
                </div>
                <div className="row product-container">
                    <h1 className='head-texts'>Similar Products</h1>
                    {relatedProducts.length < 1 && <p>No Similar Products Found</p>}
                    <div className="d-flex flex-wrap flex-center">
                        {relatedProducts?.map((product) => (
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
        </Layout >
    )
}

export default ProductDetail