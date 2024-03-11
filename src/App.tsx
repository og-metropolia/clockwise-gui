import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import ROUTES from './constants/routes';
import { UserProvider, getCookie } from './components/UserContext';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SettingsPage from './pages/Settings/SettingsPage';
import VacationPage from './pages/Vacation/VacationPage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import Dashboard from '@/pages/Dashboard/Dashboard';
import ManagerDashboard from '@/pages/ManagerDashboard/ManagerDashboard';
import ReportPage from './pages/Report/ReportPage';
import './i18n';

import 'react-day-picker/dist/style.css';
import VisitPage from './pages/Visit/VisitPage';

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
    loader: () => (isAuth() ? redirect(ROUTES.dashboard) : null),
  },
  {
    path: ROUTES.dashboard,
    element: <Dashboard />,
    loader: () =>
      isAuth()
        ? isManager()
          ? redirect(ROUTES.managerDashboard)
          : null
        : redirect(ROUTES.login),
  },
  {
    path: ROUTES.settings,
    element: <SettingsPage />,
    loader: () => (isAuth() ? null : redirect(ROUTES.login)),
  },
  {
    path: ROUTES.report,
    element: <ReportPage />,
    loader: () =>
      isAuth()
        ? isManager()
          ? redirect(ROUTES.managerDashboard)
          : null
        : redirect(ROUTES.login),
  },
  {
    path: ROUTES.vacation,
    element: <VacationPage />,
    loader: () =>
      isAuth()
        ? isManager()
          ? redirect(ROUTES.managerDashboard)
          : null
        : redirect(ROUTES.login),
  },
  {
    path: ROUTES.managerDashboard,
    element: <ManagerDashboard />,
    loader: () =>
      isAuth()
        ? !isManager()
          ? redirect(ROUTES.dashboard)
          : null
        : redirect(ROUTES.login),
  },
  {
    path: ROUTES.visit,
    element: <VisitPage />,
    loader: () =>
      isAuth()
        ? !isManager()
          ? redirect(ROUTES.dashboard)
          : null
        : redirect(ROUTES.login),
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

function isAuth() {
  const context = {
    ...JSON.parse(localStorage.getItem('user') ?? '{}'),
  };
  return !!getCookie('token') && !!context?.user;
}

function isManager() {
  const context = {
    ...JSON.parse(localStorage.getItem('user') ?? '{}'),
  };
  return context?.user?.role === 'MANAGER';
}

export default App;
