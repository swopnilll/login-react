import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from "axios";

import useAuth from '../hooks/useAuth';

const baseURL = "http://localhost:3011/login";

export const Login = () => {

  const location = useLocation();

  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  console.log(authenticatedUser);

  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/allergy"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let apiResponse: UserAuth = {
        id: 0,
        email: '',
        name: '',
        accessToken: ''
      };

      await axios
        .post(baseURL, {
          email,
          password
        })
        .then((response) => {
          apiResponse = response?.data?.data;
        });

      setAuthenticatedUser({ id: apiResponse?.id, accessToken: apiResponse?.accessToken, name: apiResponse?.name, email: apiResponse?.email });
      navigate(from, { replace: true});

    } catch (err: any) {
      if (!err?.response) {
        setErrorMessage('No Server Response');
      } else if (err.response?.status === 409) {
        setErrorMessage('Missing email or password');
      } else if (err.response?.status === 401) {
        setErrorMessage("Unauthorised")
      }
      else {
        setErrorMessage('Login Failed')
      }
    }
  }


  return (
    <div className="login-component">
      <p className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
      <h1>Login In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email"
          id="email"
          autoComplete="off"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password">Password:</label>

        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Login</button>
      </form>
      <div className='register-button'>
        <Link to='/auth/register'><button>Create Account</button></Link>
      </div>
    </div >
  );
};
