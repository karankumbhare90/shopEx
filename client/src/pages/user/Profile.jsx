import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'sonner'
import axios from 'axios'
import './Profile.css';

const Profile = () => {

    // Context
    const [auth, setAuth] = useAuth();

    // States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // Get User Data
    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address)
    }, [auth?.user])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile', {
                name,
                email,
                password,
                phone,
                address,
            });

            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth({ ...auth, user: data?.updateUser })
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updateUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile Updated');
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={'Your Profile | ShopEx'}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="register">
                            <h1>Update Profile</h1>
                            <form className='form' onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        id="exampleInputName"
                                        placeholder='Update Name' />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder='Update Email Address'
                                        disabled />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        id="exampleInputPassword"
                                        placeholder='Update Password'
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        id="exampleInputPhone"
                                        placeholder='Update Contact No'
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        id="exampleInputAddress"
                                        placeholder='Update Address'
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile