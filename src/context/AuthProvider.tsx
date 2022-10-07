import { createContext, useState } from "react";


export const AuthContext = createContext<AuthProviderContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authenticatedUser, setAuthenticatedUser] = useState<UserAuth>();

    return (
        <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;