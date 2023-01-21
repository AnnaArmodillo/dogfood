import {
  createContext, useEffect, useState,
} from 'react';

export const AppContext = createContext();
export function AppContextProvider({ children }) {
  const tokenFromStorage = localStorage.getItem('token');
  const [token, setToken] = useState(() => tokenFromStorage || '');
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  console.log(token);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}
