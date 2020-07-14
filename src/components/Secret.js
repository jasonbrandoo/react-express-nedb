import React from 'react';
import { UserContext } from '../utils/UserContext';

function Secret() {
  const { userData } = React.useContext(UserContext);

  return (
    <div>
      <h1>Welcome to Secret page {userData}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit
        repudiandae veniam tempore placeat aut doloremque dolorum quibusdam
        incidunt excepturi.
      </p>
    </div>
  );
}

export default Secret;
