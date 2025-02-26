import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {logout} = useContext(AdminAuthContext);
    return (
        <div className="card shadow mb-5 sidebar">
            <div className="card-body p-3">
                <ul>
                    <li>
                        <a href="/admin/dashboard">Dashboard</a>
                    </li>
                    <li>
                        <Link to="/admin/categories">Categories</Link>
                    </li>
                    <li>
                        <Link to="/admin/brands">Brands</Link>
                    </li>
                    <li>
                        <a href="/admin/dashboard">Products</a>
                    </li>
                    <li>
                        <a href="/admin/dashboard">Orders</a>
                    </li>
                    <li>
                        <a href="/admin/dashboard">Users</a>
                    </li>
                    <li>
                        <a href="/admin/dashboard">Shipping</a>
                    </li>
                    <li>
                        <a href="/admin/dashboard">Change Password</a>
                    </li>
                    <li>
                        <a href="#" onClick={logout}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar