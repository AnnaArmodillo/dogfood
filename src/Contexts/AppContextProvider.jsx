import {
  createContext, useEffect, useState,
} from 'react';

export const AppContext = createContext();
export const AppMethodsContext = createContext();
export function AppContextProvider({ children }) {
  const tokenFromStorage = localStorage.getItem('token');
  const [token, setToken] = useState(() => tokenFromStorage || '');
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  console.log(token);
  const appMethods = setToken;
  return (

    <AppContext.Provider value={token}>
      <AppMethodsContext.Provider value={appMethods}>
        {children}
      </AppMethodsContext.Provider>
    </AppContext.Provider>
  );
}
