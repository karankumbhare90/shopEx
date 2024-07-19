import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'sonner';
import './SearchPage.css';

const SearchPage = () => {

    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();


    return (
        <Layout title={'Search Results | ShopEx'}>
            <div className="container-fl products">
                <h1 className="heading">Search Result</h1>
                <h6>{values?.results.length < 1 ? 'No Product Found' : `Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap">
                    {values?.results.map((product) => (
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
        </Layout>
    )
}

export default SearchPage