import React, { useEffect, useState } from "react";
import {Link,useHistory} from "react-router-dom";
import axios from "axios";

const Login = () => {
  const title = "Login";
  const userLoginUrl="http://localhost:8762/auth/login";

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [errorMessage,setErrorMessage]=useState("");
  const history = useHistory();

  const sendLoginDetails = (event) => {
    event.preventDefault();
    let params = {"username": username, "password": password};
    axios.post(userLoginUrl,params)
    .then(res=>{checkResponse(res.data);});
}

const checkResponse = (response) => {
    if (response.correct) {
        localStorage.setItem("token", response.token);
        redirect();
    } else {
        setErrorMessage(response.msg);
    }
};

const redirect = () => {
    history.push("/");
    window.location.reload();
};

  return (
    <div style={logingGrid}>
        <div style={loginCardStyle}>
            <div className="login-text-container">
                <h1>{title}</h1>
            </div>
            <div className="form-container">
                <h3>{errorMessage}</h3>
                <form className="login-form" onSubmit={sendLoginDetails}>
                    <label htmlFor="login-username-input" className="login-label">Username</label>
                    <input type="text" name="login-username-input" className="login-input" required placeholder="Username" autoComplete="off" onChange={event => setUsername(event.target.value)}/>
                    
                    <label htmlFor="login-password-input" className="login-label">Password</label>
                    <input type="password" name="login-password-input" className="login-input" required placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                    
                    <input type="submit" className="login-button" value="Login"/>
                </form>
            </div>

            <div className="registration-link-container">
                <Link to="/registration" className="registration-link">
                    Click here to sign up!
                </Link>
            </div>
        </div>
    </div>
    );
};

const loginCardStyle = {
    maxWidth: "40rem", //30
    minWidth:"1fv",
    height: "30rem",
    display: "grid",
    gridTemplateColumns: "1fv",
    gridTemplateRows: "10rem 10rem 5rem",
    borderRadius: "18px",
    background: "white",
    boxShadow:" 5px 5px 15px rgba(0,0,0,0.9)",
    fontFamily: "roboto",
    textAlign: "center",
    backgroundColor: "rgb(242, 242, 242)",
  
  };

  const logingGrid ={
    display: "grid",
    gap : "1rem",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    gridTemplateColumns: "1fv",
    gridTemplateRows: "1fv"
  }

export default Login;