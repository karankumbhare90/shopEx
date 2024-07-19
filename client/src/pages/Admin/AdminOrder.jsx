import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';
const Option = Select;

const AdminOrder = () => {

    const [status, setStatus] = useState(['No Process', 'Processing', 'Shipped', 'Delivered', 'Cancel']);
    const [changeStatus, setChangeStatus] = useState('');

    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChane = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value })
            getOrders();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title={'All Orders Data | ShopEx'}>
            <div className="container-fluid p-3 m-3">
                <div className="row create-category">
                    <div className="col-md-3 filters mar">
                        <AdminMenu />
                    </div>
                    <div className="col-md-8 category-details">
                        <h1 className='text-center heading'>All Orders</h1>
                        <div className="border-shadow">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Buyer</th>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Payment</th>
                                        <th scope='col'>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((order, index) => (
                                        <React.Fragment key={order._id}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Select bordered={false} onChange={(value) => handleChane(order._id, value)} defaultValue={order?.status}>
                                                        {status?.map((item, index) => (
                                                            <Option key={index} value={item}>
                                                                {item}
                                                            </Option>
                                                        ))}

                                                    </Select>
                                                </td>
                                                <td>{order?.buyer?.name}</td>
                                                <td>{moment(order?.createdAt).fromNow()}</td>
                                                <td>{order?.payment?.success ? "Success" : "In Process"}</td>
                                                <td>{order?.products.length}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrder