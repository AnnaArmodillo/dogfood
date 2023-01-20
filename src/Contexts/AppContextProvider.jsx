import {
  createContext, useEffect, useState,
} from 'react';

export const AppContext = createContext();
export function AppContextProvider({ children }) {
  // const [token, setToken] = useState(
  //   localStorage.getItem('token') ? localStorage.getItem('token') : '',
  // );
  const [token, setToken] = useState('');
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}
