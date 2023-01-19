import { createContext } from 'react';

export const AppContext = createContext();
export function AppContextProvider({ children }) {
  const token = 'ddd';

  return (
    <AppContext.Provider value={token}>
      {children}
    </AppContext.Provider>
  );
}
