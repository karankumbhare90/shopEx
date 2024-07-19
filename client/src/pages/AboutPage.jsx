import React from "react";
import Layout from "./../components/Layout/Layout";
import './Contactus.css'
import about from '../assets/about.jpg'

const AboutPage = () => {
    return (
        <Layout title={'About Us | ShopEx'}>
            <div className="aboutus">
                <img
                    src={about}
                    alt="contactus"
                    style={{ width: "100%" }}
                />
                <div className="details-about">
                    <h3 className="about-head">About Us</h3>
                    <p className="description">
                        Welcome to ShopEx, where passion meets innovation. Established in 2024, we aim to redefine online shopping by offering a seamless and trustworthy platform. Our curated collection includes the latest in fashion, cutting-edge electronics, home essentials, and unique handmade crafts. We are dedicated to providing exceptional customer service, from a user-friendly interface to secure payments and reliable shipping. We value your feedback and continuously strive to improve. Join us at ShopEx and discover a world where quality meets convenience. Thank you for choosing us as your trusted online shopping destination.
                    </p>
                </div>
            </div>
        </Layout >
    );
};

export default AboutPage;