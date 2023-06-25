import { useEffect, useState } from 'react';
import req from '../utils/network/req';

const useGlobal = () => {
  const [loading, setLoading] = useState();
  const [allSoftwares, setAllSoftwares] = useState([]);

  useEffect(() => {
    req({ target: 'app' })
      .then((res) => {
        setAllSoftwares(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, [loading]);

  return {
    loading,
    allSoftwares,
  };
};

export default useGlobal;
