import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {POST_CONFIG,GET_CONFIG} from "./Constants";


const Navbar = () => {
  
  const [token,setToken] = useState(null);
  const [score,setScore]=useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"))   
      axios.get("http://localhost:8762/jwtUtils/username",GET_CONFIG)
      .then(res=>{
        axios.get(`http://localhost:8762/user-handler/user-currency/${res.data}`,GET_CONFIG)
        .then(res=>{
          setScore(res.data);
          console.log(res.data);
        });
      })
      
  },[]);

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(false);
}

  return (

    <div style={navbarGridStyle}>
      <NavBarHeader>
        <MyLink to={"/"}>Home</MyLink>
        <MyLink to={"/games"}>Games</MyLink>
        {token ?
        (
          <>
            <button style={logutButtonStyle} onClick={logoutHandler}>Logout</button>       
          </>
        )
        :
        (
          <MyLink to={"/login"}>Login</MyLink>

        )
        }
      </NavBarHeader>
      <div></div>
      {token ? 
      (
        <div>
          <p style={logutButtonStyle}>Score:{score}</p>
        </div>
      )
      : 
      (
      <div></div>
      )}

    </div>
  );
};

const NavBarHeader = styled.header`
  width: 1fr;
  height: 2.5rem;
  padding: 1rem;
  background-color: #2b2b2b;
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const navbarGridStyle ={
  width: "1fr",
  display: "grid",
  gap : "1rem",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr",
  backgroundColor: "#2b2b2b"

}
const MyLink = styled(Link)`
  margin: 0.2rem 1rem;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    transition: 350ms;
    color: #a9a9a9;
    text-decoration: none;
  }
  font-size: 1.5rem;
`;

const logutButtonStyle = {
  backgroundColor: "#2b2b2b",
  cursor:PointerEvent,
  color:"white",
  fontSize:"1.5rem",
  fontWeight: "bold",
  textDecoration: "none",
  textTransform: 'uppercase',
  fontWeight: "bold",
  textAlign:"center",
  verticalAlign: "text-bottom",
  height:"1fv",
  borderBottomLeftRadius:"15px",
  borderBottomRightRadius:"15px",
  justifyContent: "center",
  alignContent: "center",
  border:"none",
  outline: "none"
};


export default Navbar;