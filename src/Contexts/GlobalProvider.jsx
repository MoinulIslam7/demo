import React, { createContext, useContext } from 'react';
import useGlobal from '../Hooks/useGlobal';

const globalCtx = createContext();
export default function GlobalProvider({ children }) {
  const data = useGlobal();
  return (
    <globalCtx.Provider value={data}>
      {children}
    </globalCtx.Provider>
  );
}
export const useGlobalCtx = () => useContext(globalCtx);
