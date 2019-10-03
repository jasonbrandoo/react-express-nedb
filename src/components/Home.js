import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const { state } = useLocation();
  const [message, setMessage] = React.useState(state);

  if (state) {
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }

  return (
    <div>
      {state && <p>{message.message}</p>}
      <h1>Welcome</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius aliquam
        cupiditate suscipit modi ea porro consectetur est, fugiat ab nihil.
      </p>
    </div>
  );
}

export default Home;
