import React from "react";
import Layout from "./../components/Layout/Layout";
import './Policy.css';
import policy from '../assets/contact.jpg'

const Policy = () => {
    return (
        <Layout title={'Provacy Policy | ShopEx'}>
            <div className="image-sections">
                <img src={policy} alt="E-commerce Market" />
                <div className="description">
                    <h1 className="slogans">Privacy Policy</h1>
                    <p className="paras">Welcome to E-commerce, your ultimate online shopping destination. Discover a wide range of products from top brands, all in one convenient place. Whether you're looking for the latest fashion trends, cutting-edge electronics, home essentials, or unique gifts, we've got you covered. Enjoy a seamless shopping experience with easy navigation, secure payments, and fast shipping. Shop smart, shop easy with E-commerce Site Name today!</p>
                </div>
            </div>
        </Layout >
    );
};

export default Policy;