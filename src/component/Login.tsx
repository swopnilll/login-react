export const Login = () => {
  return (
    <div className="login-component">
      <form>
        <label htmlFor="username">Email:</label>
        <input type="text" id="username" autoComplete="off" required />

        <label htmlFor="password">Password:</label>

        <input type="password" id="password" required />
        <button>Login</button>
      </form>
    </div>
  );
};
