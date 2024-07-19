import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Homepage, AboutPage, Contact, NotFound, Policy, CategoryProduct, SearchPage, ProductDetail, Categories, Cart } from './pages/index'

import { AdminDashboard, AdminOrder, CreateCategory, CreateProduct, Products, UpdateProduct } from './pages/Admin/index'

import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import PrivateRoute from './components/Routes/PrivateRoute'
import AdminRoute from './components/Routes/AdminRoute';
import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:slug' element={<ProductDetail />} />
        <Route path='/category' element={<Categories />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/products' element={<Products />} />
          {/* <Route path='admin/users' element={<User />} /> */} {/** Import Before use */}
          <Route path='admin/orders' element={<AdminOrder />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
