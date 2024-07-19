import React from 'react';
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <h4 className='text-center'>
                All Right Reserved &copy; Karan Kumbhare
            </h4>
            <p className="links">
                <Link to='/about'>About</Link> |
                <Link to='/contact'>Contact</Link> |
                <Link to='/policy'>Privacy Policy</Link>
            </p>
        </div>
    )
}

export default Footer
