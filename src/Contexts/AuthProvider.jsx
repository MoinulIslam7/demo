import React, { createContext, useContext } from 'react';
import useUser from '../Hooks/useUser';

const authCtx = createContext();
export default function AuthProvider({ children }) {
  const data = useUser();
  return (
    <authCtx.Provider value={data}>
      {children}
    </authCtx.Provider>
  );
}
export const useAuth = () => useContext(authCtx);
