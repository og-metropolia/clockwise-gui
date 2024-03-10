import { fetchGraphql } from '@/graphql/fetch';
import { getUserQuery } from '@/graphql/queries';
import { LoginUser } from '@/types/user';
import { createContext, useContext } from 'react';

export type ContextUser = {
  token: string;
  user: LoginUser;
} | null;

export function setCookie(name: string, value: string, expireDays: number) {
  let expires = '';
  if (expireDays) {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name: string) {
  const cookies = Object.fromEntries(
    document.cookie.split(/; /).map((c) => {
      const [key, v] = c.split('=', 2);
      return [key, decodeURIComponent(v ?? '')];
    }),
  );
  return cookies[name] || '';
}

function resetCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export const UserContext = createContext({
  getUser: () => {
    const context = {
      ...JSON.parse(localStorage.getItem('user') ?? '{}'),
    };
    return context ? context.user : null;
  },
  getToken: () => {
    return getCookie('token');
  },
  login: async (context: ContextUser) => {
    if (!context) return;
    setCookie('token', context.token, 7);
    const user = await fetchGraphql(getUserQuery, { userId: context.user.id });
    if (!user) return null;
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout: () => {
    resetCookie('token');
    localStorage.removeItem('user');
  },
  updateUser: (user: LoginUser) => {
    if (!user) return null;
    localStorage.setItem('user', JSON.stringify({ user: user }));
  },
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const getUser = () => {
    const context = {
      ...JSON.parse(localStorage.getItem('user') ?? '{}'),
    };
    return context ? context.user : null;
  };

  const getToken = () => {
    return getCookie('token');
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

  const updateUser = (user: LoginUser) => {
    if (!user) return null;
    localStorage.setItem('user', JSON.stringify({ user: user }));
  };

  return (
    <UserContext.Provider
      value={{ getUser, getToken, login, logout, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
