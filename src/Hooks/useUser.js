import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import req from '../utils/network/req';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [allusers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const cheeckRole = (role) => role.includes(user.role);

  useEffect(() => {
    req({ target: 'me' })
      .then((res) => {
        setUser(res);
        setApps(res.app.map((a) => a.id));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    req({ target: 'users' })
      .then((res) => {
        setAllUsers(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading]);

  const logIn = (data) => {
    req({ target: 'login', body: data })
      .then((res) => {
        setUser(res);
        navigate('/');
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const register = (data) => {
    req({ target: 'register', body: data })
      .then((res) => {
        setUser(res);
        navigate('/');
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateOwn = (data) => {
    req({ target: 'updateOwn', body: data })
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateOne = (id, data) => {
    req({ target: 'updateOne', params: { id }, body: data })
      .then((res) => res)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getUserProfile = (id) => {
    req({ target: 'userProfile', params: { id } })
      .then((res) => res)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    req({ target: 'logout' })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeUser = (id) => {
    req({ target: 'removeUser', params: { id } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    user,
    setUser,
    isLoading,
    logIn,
    register,
    updateOwn,
    updateOne,
    getUserProfile,
    logout,
    removeUser,
    cheeckRole,
    apps,
    setApps,
    allusers,
    setAllUsers,
  };
};

export default useUser;
