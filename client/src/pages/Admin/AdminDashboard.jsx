import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import admin from '../../assets/admin.png'
import './AdminDashboard.css'

const AdminDashboard = () => {

    const [auth] = useAuth();

    const capitalize = (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <Layout title={'Admin Dashboard | ShopEx'}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 filters mar">
                        <AdminMenu />
                    </div>

                    <div className="col-md-9">
                        <div className="admin">
                            <div className="imgcl">
                                <img src={admin} alt="Admin" />
                            </div>
                            <div className="details">
                                <span>Admin Name : {auth?.user?.name}</span>

                                <span>Admin Email : {auth?.user?.email}</span>
                                <span>Admin Contact : {auth?.user?.phone}</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
