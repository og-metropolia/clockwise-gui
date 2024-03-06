import { fetchGraphql } from '@/graphql/fetch';
import { getUserQuery } from '@/graphql/queries';
import { createContext, useContext } from 'react';

export type ContextUser = {
  token: string;
  user: { email: string; id: string; role: string };
} | null;

function setCookie(name: string, value: string, expireDays: number) {
  let expires = '';
  if (expireDays) {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function resetCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export const UserContext = createContext({
  getUser: () => null,
  login: async (context: ContextUser) => {
    if (!context) return;
    setCookie('token', context.token, 7);
    const user = await fetchGraphql(getUserQuery, { userId: context.user.id });
    if (!user) return null;
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const getUser = () => {
    const user = {
      ...JSON.parse(localStorage.getItem('user') ?? '{}'),
    };
    return user ? user.user : null;
  };

  const login = async (context: ContextUser) => {
    if (!context) return;
    setCookie('token', context.token, 7);
    const user = await fetchGraphql(getUserQuery, { userId: context.user.id });
    if (!user) return null;
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    resetCookie('token');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ getUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
