interface AuthProviderProps {
    children: React.ReactNode
}

interface UserAuth {
    id: number;
    email: string;
    name: string;
    accessToken: string;
}

interface AuthProviderContextProps {
    authenticatedUser: userAuth,
    setAuthenticatedUser: (user: UserAuth) => void
}
