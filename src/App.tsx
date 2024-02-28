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

const router = createBrowserRouter([
  {
    path: '/',
    action: () => {
      return redirect(ROUTES.dashboard);
    },
  },
  {
    path: ROUTES.signup,
    element: <SignupPage />,
  },
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ROUTES.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: ROUTES.dashboard,
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
