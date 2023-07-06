import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import req from '../utils/network/req';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectApps, setSelectedApps] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const checkRole = (role) => role.includes(user?.role);

  useEffect(() => {
    (async () => {
      try {
        const userResponse = await req({ target: 'me' });
        setUser(userResponse);
        setSelectedApps(userResponse.app);

        const usersResponse = await req({ target: 'users' });
        setAllUsers(usersResponse);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const logIn = (data) => {
    req({ target: 'login', body: data })
      .then((res) => {
        setUser(res);
        if (res.role === 'user') {
          navigate('/home');
        }
        if (res.role === ('admin' || 'super admin')) {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  const registerUser = (data) => {
    req({ target: 'registerUser', body: data })
      .then((res) => {
        setAllUsers(([...prev]) => ([...prev, res]));
        navigate('/');
      })
      .catch((err) => console.log(err));
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
    req({ target: 'updateOne', param: id, body: data })
      .then((res) => {
        setAllUsers(([...prev]) => (prev.map((p) => (p.id === res.id ? res : p))));
      })
      .catch((err) => console.log(err));
  };

  const getUserProfile = (id) => {
    req({ target: 'userProfile', params: { id } })
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  const logout = () => {
    req({ target: 'logout' })
      .then(() => {
        navigate('/login');
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  const removeUser = (id) => {
    req({ target: 'removeUser', param: id })
      .then(() => {
        setAllUsers((prevUsers) => prevUsers.filter((e) => e.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return {
    user,
    setUser,
    isLoading,
    logIn,
    registerUser,
    updateOwn,
    updateOne,
    getUserProfile,
    logout,
    removeUser,
    checkRole,
    selectApps,
    setSelectedApps,
    allusers,
    setAllUsers,
  };
};

export default useUser;
