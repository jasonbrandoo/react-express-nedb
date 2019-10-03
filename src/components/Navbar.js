import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.svg';
import { UserContext } from '../utils/UserContext';

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  height: 5rem;
  border-bottom: 1px solid #09d3ac;
`;

const StyledLink = styled(NavLink)`
  padding: 1rem;
  text-decoration: none;
  color: #09d3ac;
`;

const StyledLogOut = styled.div`
  text-decoration: none;
  margin: 0 1rem;
  color: #09d3ac;
  cursor: pointer;
`;

const StyledImg = styled.img`
  width: 5%;
  margin: 0 1rem;
`;

const RightSide = styled.div`
  margin-left: auto;
`;

function Navbar() {
  const { login } = React.useContext(UserContext);

  async function logOut() {
    try {
      const res = await axios.get('http://localhost:3001/api/v1/logout', {
        withCredentials: true,
      });
      if (res.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <StyledNavbar>
      <StyledImg src={logo} alt="logo" />
      <StyledLink to="/">Home</StyledLink>
      {login && <StyledLink to="/secret">Secret</StyledLink>}
      <RightSide>
        {login ? (
          <StyledLogOut onClick={logOut}>Logout</StyledLogOut>
        ) : (
          <>
            <StyledLink to="/register">Register</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
          </>
        )}
      </RightSide>
    </StyledNavbar>
  );
}

export default Navbar;
