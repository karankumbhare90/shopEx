import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoryProduct.css'

const CategoryProduct = () => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (params?.slug) getProductsByCategory();
    }, [params?.slug])


    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={'Categories Product | ShopEx'}>
            <div className="category-container">
                <h4 className='text-center heading'>Category - {category[0]?.name}</h4>
                <h6 className='text-center sub-heading'>{products?.length} Result found</h6>
                <div className="row">
                    <div className="d-flexx">
                        {products?.map((product) => (
                            <div className="card">
                                <div className="card-img">
                                    <img src={`/api/v1/product/product-image/${product._id}`} alt={product.name} />
                                </div>
                                <div className="card-body">
                                    <div className="card-des">
                                        <h5 h5 className="card-title" > {product.name}</h5>
                                        <p className="card-price">${product.price}</p>
                                    </div>
                                    <p className="card-text">{product.description.substring(0, 20)}...</p>
                                    <div className="btns">
                                        <button className="btn btn-primary" onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                                        <button className="btn btn-warning">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </div >
        </Layout >
    )
}

export default CategoryProduct