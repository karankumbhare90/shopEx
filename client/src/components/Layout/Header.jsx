import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FcShop } from "react-icons/fc";
import { useAuth } from '../../context/auth';
import { toast } from 'sonner';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd'
import './Header.css'

const Header = () => {

    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    const handleLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })

        localStorage.removeItem('auth');
        toast.success('Logout Successfully');
    }

    const capitalize = (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <FcShop className='logo-icon' /> <span className='logo-text'>ShopEx</span>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav ms-auto nav-center">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/categories" data-bs-toggle="dropdown">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    {categories?.map((category) => (
                                        <li><Link className="dropdown-item" to={`/category/${category.slug}`}>{category?.name}</Link></li>
                                    ))}
                                </ul>
                            </li>

                            {
                                !auth.user
                                    ? (
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/register">Register</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/login">Login</NavLink>
                                            </li>
                                        </>
                                    )
                                    : (
                                        <>
                                            <li className="nav-item dropdown">
                                                <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {capitalize(auth?.user?.name)}
                                                </NavLink>
                                                <ul className="dropdown-menu">
                                                    <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>{auth?.user?.role === 1 ? 'Dashboard' : 'Profile'}</NavLink></li>
                                                    <li style={{ display: auth?.user?.role === 1 ? 'none' : 'block' }}>
                                                        <Badge count={cart?.length} showZero>
                                                            <NavLink className="dropdown-item" to="/cart">
                                                                Cart
                                                            </NavLink>
                                                        </Badge>

                                                    </li>
                                                    <li><NavLink className="dropdown-item" to="/login" onClick={handleLogOut}>Logout</NavLink></li>
                                                </ul>
                                            </li>
                                        </>
                                    )
                            }
                        </ul>
                    </div>
                </div >
            </nav >
        </>
    )
}

export default Header
