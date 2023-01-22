/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, useEffect, useState,
} from 'react';
import { dogFoodApi } from '../api/DogFoodApi';

export const AppContext = createContext();
export const AppSetContext = createContext();
export function AppContextProvider({ children }) {
  const tokenFromStorage = localStorage.getItem('token');
  const userIDFromStorage = localStorage.getItem('userID');
  const [token, setToken] = useState(() => tokenFromStorage || '');
  const [userID, setUserID] = useState(() => userIDFromStorage || '');
  useEffect(() => {
    localStorage.setItem('token', token);
    dogFoodApi.setToken(token);
  }, [token]);
  useEffect(() => {
    localStorage.setItem('userID', userID);
    dogFoodApi.setUserID(userID);
  }, [userID]);
  const appSet = { setToken, setUserID };
  return (

    <AppContext.Provider value={{ token, userID }}>
      <AppSetContext.Provider value={appSet}>
        {children}
      </AppSetContext.Provider>
    </AppContext.Provider>
  );
}
