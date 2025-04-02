import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
    const {logout} = useContext(AuthContext);
    return (
        <div className="card shadow mb-5 sidebar">
            <div className="card-body p-3">
                <ul>
                    <li>
                        <a href="/account">Account</a>
                    </li>
                    <li>
                        <Link to="/admin/categories">Orders</Link>
                    </li>
                    <li>
                        <Link to="/admin/brands">Change Password</Link>
                    </li>
                    <li>
                        <a href="#" onClick={logout}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserSidebar