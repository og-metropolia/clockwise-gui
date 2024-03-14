import React, { useState } from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import DashboardIcon from './icons/DashboardIcon.tsx';
import ReportIcon from './icons/ReportIcon.tsx';
import HomeIcon from './icons/HomeIcon.tsx';
import VacationIcon from './icons/VacationIcon.tsx';
import SettingsIcon from './icons/SettingsIcon.tsx';
import ROUTES from '../constants/routes';
import { useUser } from './UserContext.tsx';
import AddCompanyIcon from './icons/AddCompanyIcon.tsx';

const setActive = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'active-icon' : 'inactive-icon';
};

const Footer: React.FC = () => {
  const { getUser } = useUser();
  const role = getUser().role;
  const [isReportIconActive, setIsReportIconActive] = useState(false);

  const activateReportIcon = () => {
    setIsReportIconActive(true);
  };

  return (
    <div className="footer-container">
      {role === 'EMPLOYEE' && (
        <>
          <NavLink to={ROUTES.dashboard} className={setActive}>
            <DashboardIcon />
          </NavLink>
          <NavLink to={ROUTES.report} className={setActive}>
            <ReportIcon />
          </NavLink>
          <NavLink to={ROUTES.vacation} className={setActive}>
            <VacationIcon />
          </NavLink>
          <NavLink to={ROUTES.settings} className={setActive}>
            <SettingsIcon />
          </NavLink>
        </>
      )}

      {role === 'MANAGER' && (
        <>
          <NavLink to={ROUTES.managerDashboard} className={setActive}>
            <HomeIcon />
          </NavLink>
          <NavLink
            to={window.location.href}
            className={`link ${window.location.pathname.includes(ROUTES.visit) ? 'active-link' : 'disabled-link'}`}
          >
            <ReportIcon />
          </NavLink>
          <NavLink to={ROUTES.settings} className={setActive}>
            <SettingsIcon />
          </NavLink>
        </>
      )}

      {role === 'ADMIN' && (
        <>
          <NavLink to={ROUTES.adminDashboard} className={setActive}>
            <HomeIcon />
          </NavLink>
          <NavLink to={ROUTES.companySignup} className={setActive}>
            <AddCompanyIcon />
          </NavLink>
          <NavLink to={ROUTES.settings} className={setActive}>
            <SettingsIcon />
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Footer;
