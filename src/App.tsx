import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import Dashboard from '@/pages/Dashboard/Dashboard';

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import ROUTES from './constants/routes';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SettingsPage from './pages/Settings/SettingsPage';
import { UserProvider } from './components/UserContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Error</div>,
    loader: () => redirect(ROUTES.dashboard),
  },
  {
    path: ROUTES.signup,
    element: <SignupPage />,
    loader: () => (isAuth() ? redirect(ROUTES.dashboard) : null),
  },
  {
    path: ROUTES.login,
    element: <LoginPage />,
    loader: () => (isAuth() ? redirect(ROUTES.dashboard) : null),
  },
  {
    path: ROUTES.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: ROUTES.dashboard,
    element: <Dashboard />,
    loader: () => (isAuth() ? null : redirect(ROUTES.login)),
  },
  {
    path: ROUTES.settings,
    element: <SettingsPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;

function isAuth() {
  return document.cookie
    .split(';')
    .some((item) => item.trim().startsWith('token='));
}

// // Luo funktio, joka lähettää pyynnön palvelimelle tokenin tarkistamiseksi.

// async function verifyToken() {
//   try {
//     const response = await fetch('/api/verifyToken', {
//       method: 'GET',
//       credentials: 'include' // Varmistaa, että evästeet lähetetään pyynnön mukana
//     });
//     if (response.ok) {
//       const data = await response.json();
//       return data.isValid; // Palvelimen tulisi palauttaa, onko tokeni voimassa vai ei
//     }
//     return false;
//   } catch (error) {
//     console.error('Verification failed', error);
//     return false;
//   }
// }

// // Käytä luotua funktiota reitittimesi loader-funktiossa.

// const router = createBrowserRouter([
//   // ...
//   {
//     path: ROUTES.dashboard,
//     element: <Dashboard />,
//     loader: async () => {
//       const isAuthTokenValid = await verifyToken();
//       if (!isAuthTokenValid) {
//         return redirect(ROUTES.login);
//       }
//     },
//   },
//   // ...
// ]);
