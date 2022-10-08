import { useState, useEffect } from "react"
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Users = () => {

    const [users, setUsers] = useState<any>();
    const { authenticatedUser } = useAuth();
        console.log(authenticatedUser);

        axios.interceptors.request.use(
            config => {
                config.headers!.Authorization = `Bearer ${authenticatedUser.accessToken}`;
                return config
            }
        )


    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3011/users');

                console.log(response.data.data)
                isMounted && setUsers(response?.data?.data)
            } catch (err) {
                console.log(err);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])

    return (
        <>
            <h2>
                {
                    users?.length
                        ? (<ul>
                            {
                                users.map((user: any, index: number) =>
                                    <li key={index}>{user?.name}</li>)
                            }

                        </ul>)
                        : <p>Users not found</p>
                }
            </h2>

        </>
    )
}

export default Users