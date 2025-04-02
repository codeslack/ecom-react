import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/Auth";

export const RequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext)

    console.log('user', user);

    if (!user) {
        return <Navigate to={`/account/login`} />
    }

    return children;
}