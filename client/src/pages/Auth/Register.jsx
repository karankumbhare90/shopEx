import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../components/Layout/Layout";
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/auth/register', {
                name,
                email,
                password,
                phone,
                address,
                answer
            });

            if (response && response.data.success) {
                toast.success(response.data && response.data.message);
                navigate('/login');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={'Register | ShopEx'}>
            <div className="login-container">
                <form className='form' onSubmit={handleSubmit}>
                    <h1 className='text'>Register Page</h1>
                    <div className="">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder='Name'
                            required />
                    </div>
                    <div className="">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder='Email Address'
                            required />
                    </div>
                    <div className="">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder='Password'
                            required />
                    </div>
                    <div className="">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder='Contact No'
                            required />
                    </div>
                    <div className="">
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            id="exampleInputAddress"
                            placeholder='Address'
                            required />
                    </div>
                    <div className="">
                        <input
                            type="text"
                            className="form-control"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            id="exampleInputAddress"
                            placeholder="What's Your Favourite Sports"
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                    <div className="links">
                        <Link to={'/login'}>Already have an account ?</Link>
                        <Link to={'/forgot-password'}>Forgot Password ?</Link>
                    </div>
                </form>

            </div>
        </Layout>
    );
};

export default Register;
