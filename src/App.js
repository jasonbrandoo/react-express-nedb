/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { webRoutes, Route } from './route';
import { Navbar, Footer } from './components';
import { UserProvider } from './utils/UserContext';

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
            {webRoutes.map(route => (
              <Route key={route.label} {...route} />
            ))}
          </Switch>
        </Container>
        <Footer />
      </UserProvider>
    </Root>
  </BrowserRouter>
);

export default App;
