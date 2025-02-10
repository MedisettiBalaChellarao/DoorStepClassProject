import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
                <li><Link to="/ProductsCard">Products</Link></li>
                <li><Link to="/Order">Orders</Link></li>
                <li><Link to="/Payment">Payments</Link></li>
                <li><Link to="/user">User</Link></li>
                <li><Link to="/Register">SignIn</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/ApiProducts">ApiProducts</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li><Link to="/Cart">Cart</Link></li>
                <li> <Link to="/ProductsList"> CrudProduct</Link></li>


            </ul>
        </nav>
    );
};

export default Navbar;