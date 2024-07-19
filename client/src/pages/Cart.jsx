import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios';
import { toast } from 'sonner';
import './Cart.css'

const Cart = () => {

    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Remove Item From Cart
    const removeCartItem = async (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }

    // Total Price
    const totalPrice = () => {
        try {
            let total = 0;

            cart?.map((item) => (
                total = total + item.price
            ))

            return total.toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            });
        } catch (error) {

        }
    }

    // GET Payment Gateway Token
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`/api/v1/product/braintree/payment`, {
                nonce, cart
            })
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Payment Successfull');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])

    return (
        <Layout title={'Cart | ShopEx'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='cart-name'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h2 className="text-center">
                            {cart?.length >= 1 ? `You've ${cart?.length} items in Your Cart ${auth?.token ? "" : 'Please Login to Checkout'}` : "Your Cart is Empty"}
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {cart?.map((product) => (
                            <div className="row card flex-row">
                                <div className="col-md-4 img-class">
                                    <img
                                        src={`/api/v1/product/product-image/${product._id}`}
                                        alt={product.name}
                                        style={{ objectFit: 'contain' }}
                                        height={'100px'}
                                        width={'100px'}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <p>Product Name : {product?.name}</p>
                                    <p>Description : {product.description.substring(0, 20)}</p>
                                    <p>Price : {product.price}</p>
                                    <button
                                        className="btn btns btn-danger"
                                        onClick={() => removeCartItem(product._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className="col-md-4 filters">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <p>Total : {totalPrice()}</p>
                        {auth?.user?.address
                            ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <div className="mb-3">
                                        {auth?.token
                                            ? (
                                                <>
                                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                                </>
                                            )
                                            : (
                                                <>
                                                    <button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: '/cart' })}>Login</button>
                                                </>
                                            )
                                        }
                                    </div>
                                </>
                            )}
                        <div className='mt-2'>
                            <h1>Payment Card</h1>
                            {
                                !clientToken || !cart?.length ? ("") :
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />

                                        <button className='btn btn-primary' onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>
                                            {loading ? "Processing..." : "Make Payment"}
                                        </button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart