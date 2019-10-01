import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  height: 5rem;
  border-bottom: 1px solid #09d3ac;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  margin: 0 1rem;
  color: #09d3ac;
`;

const StyledImg = styled.img`
  width: 5%;
  margin: 0 1rem;
`;

const Navbar = () => (
  <StyledNavbar>
    <StyledImg src={logo} alt="logo" />
    <StyledLink to="/">Home</StyledLink>
    <StyledLink to="/register">Register</StyledLink>
    <StyledLink to="/login">Login</StyledLink>
    <StyledLink to="/secret">Secret</StyledLink>
  </StyledNavbar>
);

export default Navbar;
