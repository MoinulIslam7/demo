import { useEffect, useState } from 'react';
import req from '../utils/network/req';
import { useAuth } from '../Contexts/AuthProvider';

const useGlobal = () => {
  const [loading, setLoading] = useState();
  const [allSoftwares, setAllSoftwares] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    req({ target: 'app' })
      .then((res) => {
        setAllSoftwares(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, [user]);
  const createSoftware = (data) => {
    req({ target: 'create', body: data })
      .then((res) => {
        setAllSoftwares(([...prev]) => ([...prev, res]));
      })
      .catch((err) => console.error(err));
  };

  return {
    loading,
    allSoftwares,
    setAllSoftwares,
    createSoftware,
  };
};

export default useGlobal;
