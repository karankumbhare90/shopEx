import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'sonner';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md"

import './CreateCategory.css'


const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updateName, setUpdateName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name });

            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategories();
                setName('');
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    const capitalize = (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // get All Categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');

            if (data?.success) {
                setCategories(data?.allCategories);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    }

    // Update Category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updateName })

            if (data?.success) {
                toast.success(`${updateName} is updated`);
                setSelected('');
                setUpdateName('');
                setVisible(false);
                getAllCategories();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
        }
    }

    // Delete Category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`)

            if (data?.success) {
                toast.success(`Category is deleted`);
                getAllCategories();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <Layout title={'Create Category | ShopEx'}>
            <div className="container-fluid">
                <div className="row create-category">
                    <div className="col-md-3 filters mar">
                        <AdminMenu />
                    </div>
                    <div className="col-md-8 category-details">
                        <div className="">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="c-details">
                            <h1>Manage Category</h1>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((category) => (
                                        <tr key={category._id}>
                                            <td>{(category.name)}</td>
                                            <td className='category-btns'>
                                                <button className='btn btn-primary ' onClick={() => { setVisible(true); setUpdateName(category.name); setSelected(category) }}><FaPencil /></button>
                                                <button className='btn btn-danger ' onClick={() => handleDelete(category._id)}><MdDeleteForever /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
