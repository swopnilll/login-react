import { Link } from 'react-router-dom'
import { useState } from "react"

export const Login = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    console.log("Form submited")
    e.preventDefault();

    console.log({ email, password })
    try {
      const loginResponse = await fetch("http://localhost:3011/login",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        },
      )

      console.log(loginResponse);
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrorMessage('No Server Response');
      } else if (err.response?.status === 409) {
        setErrorMessage('Username Taken');
      } else {
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
