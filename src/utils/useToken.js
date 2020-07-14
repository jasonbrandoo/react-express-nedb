import React from 'react';
import axios from 'axios';

function useToken() {
  const [status, setStatus] = React.useState(
    localStorage.getItem('status') || 'logged-out',
  );
  const [userData, setUserData] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('status', status);
  }, [status]);

  React.useEffect(() => {
    async function checkToken() {
      try {
        const res = await axios.get('http://localhost:3001/api/v1/check', {
          withCredentials: true,
        });
        if (res.status === 200) {
          setStatus('logged-in');
          setUserData(res.data.data);
        } else {
          setStatus('logged-out');
        }
      } catch (error) {
        setStatus('logged-out');
        window.location.href = '/login';
      }
    }

    if (status === 'logged-in') {
      checkToken();
    }

    if (status === 'logged-out') {
      setUserData('');
    }
  }, [status]);

  return { status, setStatus, userData, setUserData };
}

export default useToken;
