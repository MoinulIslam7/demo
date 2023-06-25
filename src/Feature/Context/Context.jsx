import React from 'react';
import { HashRouter } from 'react-router-dom';
import AuthProvider from '../../Contexts/AuthProvider';
import GlobalProvider from '../../Contexts/GlobalProvider';

export default function Context({ children }) {
  return (
    <HashRouter>
      <AuthProvider>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </AuthProvider>
    </HashRouter>
  );
}
