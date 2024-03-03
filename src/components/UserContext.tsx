import { createContext, useContext } from 'react';

export type ContextUser = {
  email: string;
  id: string;
  role: string;
} | null;

export const UserContext = createContext({
  getUser: () => {},
  login: (_user: ContextUser) => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const login = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ getUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
