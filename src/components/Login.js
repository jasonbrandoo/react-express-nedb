/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';

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

const StyledError = styled.div`
  padding: 1rem;
  border: 1px solid red;
  border-radius: 5px
  color: #09d3ac;
`;

function Login() {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });
  const [error, setError] = React.useState(false);
  const { setLogin } = React.useContext(UserContext);
  const history = useHistory();

  function handleInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const post = await axios.post(
        'http://localhost:3001/api/v1/login',
        form,
        {
          withCredentials: true,
        },
      );
      if (post.status === 200) {
        setLogin(true);
        history.push('/');
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  return (
    <StyledBox>
      {error && <StyledError>Error</StyledError>}
      <StyledForm onSubmit={handleSubmit}>
        <h1 style={{ marginTop: 0 }}>Login</h1>
        <label htmlFor="username">Username</label>
        <StyledInput
          type="text"
          id="username"
          name="username"
          onChange={handleInput}
          value={form.username}
        />
        <label htmlFor="password">Password</label>
        <StyledInput
          type="password"
          id="password"
          name="password"
          onChange={handleInput}
          value={form.password}
        />
        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
    </StyledBox>
  );
}

export default Login;
