import React from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

function useToken() {
  const { setUserData } = React.useContext(UserContext);
  const [status, setStatus] = React.useState(
    localStorage.getItem('status') || 'logged-out',
  );
  const [loading, setLoading] = React.useState(true);

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
          setUserData({
            id: res.data.id,
            username: res.data.username,
          });
          setLoading(false);
        }
      } catch (error) {
        setStatus('logged-out');
        setLoading(false);
        window.location.href = '/login';
      }
    }

    if (status === 'logged-in') {
      checkToken();
    }
  }, [setUserData, status]);

  return { status, setStatus, loading };
}

export default useToken;
