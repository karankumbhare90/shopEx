import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import user from '../../assets/user.png'

const Dashboard = () => {

    const [auth] = useAuth();

    const capitalize = (str) => {
        if (typeof str !== 'string') return ''

        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Layout title={'Profile | ShopEx'}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 filters mar">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="admin">
                            <div className="imgcl">
                                <img src={user} alt="Admin" />
                            </div>
                            <div className="details">
                                <span>Name : {auth?.user?.name}</span>

                                <span>Email : {auth?.user?.email}</span>
                                <span>Contact : {auth?.user?.phone}</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
