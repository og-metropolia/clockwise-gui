import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon.tsx';
import ReportIcon from './icons/ReportIcon.tsx';
import VacationIcon from './icons/VacationIcon.tsx';
import SettingsIcon from './icons/SettingsIcon.tsx';
import ROUTES from '../constants/routes';

const setActive = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'active-icon' : 'inactive-icon';
};

const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <NavLink to={ROUTES.dashboard} className={setActive}>
        <HomeIcon />
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
    </div>
  );
};

export default Footer;
