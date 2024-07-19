import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'
import contact from '../assets/contact.jpg'
import './Contact.css'

const Contact = () => {
    return (
        <Layout title={'Contact Us | ShopEx'}>
            <div className="aboutus">
                <img src={contact} alt="Contact Us" style={{ width: '100%' }} />
            </div>

            <div className="details-contact">
                <h1 className="about-head">Contact Us</h1>
                <p className="description">
                    At E-Commerce, we value your feedback and are here to assist you with any inquiries or concerns. Whether you have questions about our products, need help with your order, or want to provide feedback, our dedicated customer service team is ready to help. Reach out to us via email at karankumbhare90@gmail.com, call us at 1800-000-1000 (Toll free), or use the contact form below. We aim to respond within 24 hours. Thank you for choosing E-Commerce; your satisfaction is our priority.
                </p>
                <p className="contact-icon">
                    <span>
                        <BiMailSend /> karankumbhare90@gmail.com
                    </span>
                    <span>
                        <BiPhoneCall /> +91 6352305914
                    </span>
                    <span>
                        <BiSupport /> 1800-000-1000 (Toll free)
                    </span>
                </p>
            </div>
        </Layout >
    )
}

export default Contact
