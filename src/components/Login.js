import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  border: 1px solid #09d3ac;
  border-radius: 5px;
  margin: 2rem auto;
  padding: 2rem;
  width: fit-content;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 2.5rem;
  color: #09d3ac;
`;

const StyledInput = styled.input`
  margin: 0 0 1rem 0;
  padding: 3px 0;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border-color: #09d3ac;
  border-radius: 5px;
  color: #09d3ac;
`;

const Login = () => (
  <StyledBox>
    <StyledForm>
      <h1 style={{ marginTop: 0 }}>Login</h1>
      <label htmlFor="username">Username</label>
      <StyledInput type="text" id="username" />
      <label htmlFor="password">Password</label>
      <StyledInput type="password" id="password" />
      <StyledButton type="button">Login</StyledButton>
    </StyledForm>
  </StyledBox>
);

export default Login;
