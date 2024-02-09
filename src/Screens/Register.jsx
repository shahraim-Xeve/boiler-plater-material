import React, { useRef } from "react";
import { getData, signUpUser } from "../Config/Firebase/Firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let email = useRef();
  let password = useRef();
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let userEmail = email.current.value;
    let userPass = password.current.value;
    let type = "student";
    signUpUser({ userEmail, userPass, type })
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
    <div>
      <form onSubmit={handleLogin}>
        <h1>Sign Up</h1>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
