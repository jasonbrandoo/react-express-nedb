import React from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

function useToken() {
  const { login, setLogin } = React.useContext(UserContext);

  React.useEffect(() => {
    let mount = false;

    async function checkToken() {
      try {
        const post = await axios.get('http://localhost:3001/api/v1/check', {
          withCredentials: true,
        });
        if (post.status === 200) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        setLogin(false);
      }
    }

    if (!mount) {
      checkToken();
    }

    return () => {
      mount = true;
    };
  }, [setLogin]);

  return login;
}

export default useToken;
