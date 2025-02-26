import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AdminAuthContext} from "../context/AdminAuth";

export const AdminRequireAuth = ({ children }) => {
    const { user } = useContext(AdminAuthContext)

    console.log('user', user);

    if (!user) {
        return <Navigate to={`/admin/login`} />
    }

    return children;
}