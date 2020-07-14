import React from 'react';
import axios from 'axios';

function useToken(key) {
  const [status, setStatus] = React.useState(
    localStorage.getItem(key) || 'logged-out',
  );

  React.useEffect(() => {
    localStorage.setItem(key, status);
  }, [key, status]);

  React.useEffect(() => {
    async function checkToken() {
      try {
        const post = await axios.get('http://localhost:3001/api/v1/check', {
          withCredentials: true,
        });
        if (post.status === 200) {
          setStatus('logged-in');
        } else {
          setStatus('logged-out');
        }
      } catch (error) {
        setStatus('logged-out');
      }
    }

    if (status === 'logged-in') {
      checkToken();
    }
  }, [status]);

  return { status, setStatus };
}

export default useToken;
