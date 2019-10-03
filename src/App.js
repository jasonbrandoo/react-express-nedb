import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Secret from './components/Secret';
import { UserProvider } from './utils/UserContext';
import ProtectedRoute from './utils/ProtectedRoute';

const Root = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
`;

const Container = styled.div`
  flex: 1 0 auto;
  width: 75%;
  margin: 0 auto;
`;

const App = () => (
  <BrowserRouter>
    <Root>
      <UserProvider>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/secret" component={Secret} />
          </Switch>
        </Container>
        <Footer />
      </UserProvider>
    </Root>
  </BrowserRouter>
);

export default App;
