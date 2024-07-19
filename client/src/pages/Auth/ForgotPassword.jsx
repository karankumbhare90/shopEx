import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/auth/forgot-password', {
                email,
                newPassword,
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
        <Layout title={'Forgot Password | ShopEx'}>
            <div className="login-container">
                <form className='form' onSubmit={handleSubmit}>
                    <h1 className='text'>Reset Password</h1>
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
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder='Enter New Password'
                            required />
                    </div>

                    <div className="">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder='Email Your Favourite Sport'
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
