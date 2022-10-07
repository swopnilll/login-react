import { Link } from 'react-router-dom'
import { useState, useContext } from "react"

import axios from "axios";

import AuthContext from '../context/AuthProvider';
import { useEffect } from 'react';

const baseURL = "http://localhost:3011/login";

export const Login = () => {

  const { setAuthenticatedUser } = useContext(AuthContext) as AuthProviderContextProps;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let apiResponse:UserAuth = {
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
          setSuccess(true);
        });

      setAuthenticatedUser({ id: apiResponse?.id, accessToken: apiResponse?.accessToken, name: apiResponse?.name, email: apiResponse?.email })

    } catch (err: any) {
      if (!err?.response) {
        setErrorMessage('No Server Response');
      } else if (err.response?.status === 409) {
        setErrorMessage('Missing email or password');
      } else if(err.response?.status === 401){
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
      <h1>Register</h1>
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
        <Link to='/register'><button>Create Account</button></Link>
      </div>
    </div >
  );
};
