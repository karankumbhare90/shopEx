import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {

    const categories = useCategory();

    return (
        <Layout title={'Categories | ShopEx'}>
            <div className="container">
                <div className="row">
                    {categories?.map((category) => (
                        <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={category._id}>
                            <Link className='btn btn-primary' to={`/category/${category.slug}`}>{category.name}</Link>
                        </div>
                    ))
                    }
                </div>
            </div>
            <h1>All Categories</h1>
        </Layout>
    )
}

export default Categories