import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner'
import './Layout.css'

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div className='main'>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '100vh' }}>
                <Toaster position="top-center" richColors />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'ShopEx',
    description: 'MERN Stack Projects',
    keywords: 'ReactJS, NodeJS, MongoDB',
    author: 'Karan Kumbhare'
}

export default Layout