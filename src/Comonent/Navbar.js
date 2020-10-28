import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Navbar = () => {
  
  const [token,setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));   
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
          <MyLink to={"/profile"}>Profile</MyLink>
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
      <div><button style={logutButtonStyle} onClick={logoutHandler}>Logout</button></div>

      )
      : 
      (
        <div></div>
      )}

    </div>
  );
};

const NavBarHeader = styled.header`
  padding: 1rem;
  background-color: #2b2b2b;
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const navbarGridStyle ={
  display: "grid",
  gap : "1rem",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  gridTemplateColumns: "1fr 1fr 10%",
  gridTemplateRows: "1fv",
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
  textAlign:"center",
  verticalAlign: "text-bottom",
  height:"1fv",
  borderBottomLeftRadius:"15px",
  borderBottomRightRadius:"15px",
  justifyContent: "center",
  alignContent: "center",
  border:"none"

};


export default Navbar;