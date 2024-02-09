import React, { useRef } from "react";
import { loginUser } from "../Config/Firebase/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let email = useRef();
  let password = useRef();
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let userEmail = email.current.value;
    let userPass = password.current.value;
    loginUser({ userEmail, userPass })
      .then((res) => {
        console.log(res);
        if (res.type === "student") {
          navigate("/student");
        } else if (res.type === "admin") {
          navigate("/admin");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" placeholder="Email" ref={email} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            ref={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
