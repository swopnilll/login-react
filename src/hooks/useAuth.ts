import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const value = useContext(AuthContext) as AuthProviderContextProps;

    console.log(value)
    return value;
}

export default useAuth;