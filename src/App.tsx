import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import ROUTES from './constants/routes';
import { UserProvider } from './components/UserContext';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SettingsPage from './pages/Settings/SettingsPage';
import ReportPage from './pages/ReportPage/ReportPage';
import VacationPage from './pages/Vacation/VacationPage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import Dashboard from '@/pages/Dashboard/Dashboard';

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
  {
    path: ROUTES.report,
    element: <ReportPage />,
  },
  {
    path: ROUTES.vacation,
    element: <VacationPage />,
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
