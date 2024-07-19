import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../components/Layout/Layout";
import { toast } from 'sonner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import './Login.css';

const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/auth/login', {
                email,
                password,
            });

            if (response && response.data.success) {
                toast.success(response.data && response.data.message);
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token,
                })

                localStorage.setItem('auth', JSON.stringify(response.data));
                navigate(location.state || '/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={'Login | ShopEx'}>
            <div className="login-container">
                <form className='form' onSubmit={handleSubmit}>
                    <h1 className='text'>Login Page</h1>
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
                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className="links">
                        <Link to={'/register'}>Register</Link>
                        <Link to={'/forgot-password'}>Forgot Password ?</Link>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login
