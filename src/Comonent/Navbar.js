import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <div>
      <NavBarHeader>
        <MyLink to={"/"}>Home</MyLink>
        <MyLink to={"/games"}>Games</MyLink>
        <MyLink to={"/login"}>Login</MyLink>
      </NavBarHeader>
    </div>
  );
};

const NavBarHeader = styled.header`
  padding: 1rem;
  background-color: #2b2b2b;
  display: flex;
  width: 99.9vw;
  flex-direction: row;
  margin: 0;
`;

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

export default Navbar;