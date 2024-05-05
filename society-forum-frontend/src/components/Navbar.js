// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  background-color: #212e3d;
  position:fixed;
  padding: 15px;
  display: flex;
  flex-direction:column;
`;

const Logo = styled.h1`
  color: #fff;
  margin: 0;
  font-size:large;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-top:12%;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0e87ea;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>Community Forum</Logo>
      
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        {/* Add more navigation links as needed */}
      
    </NavbarContainer>
  );
};

export default Navbar;
