import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequiredAuth = () => {
    const { authenticatedUser } = useAuth();

    console.log(authenticatedUser);

    const location = useLocation();

    return (
        authenticatedUser?.accessToken
            ? <Outlet />
            : <Navigate to="/" state={{from: location}} replace/>

    )
}

export default RequiredAuth;