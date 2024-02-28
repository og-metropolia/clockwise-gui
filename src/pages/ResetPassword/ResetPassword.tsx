import React from 'react';
import ROUTES from '@/constants/routes';
import styles from './ResetPassword.module.css';
import Logo from '@/components/Logo';

const ResetPassword: React.FC = () => {
  return (
    <div className={styles.basePage}>
      <Logo />
      <h1 className={styles.baseHeader}>Reset Password</h1>
      <p>Forgot your password? No worries!</p>
      <p>
        Call our helpdesk at <a href="tel:+358 40 456 7890">+358 40 456 7890</a>{' '}
        or email us at{' '}
        <a href="mailto:support@clockwise.com">support@clockwise.com</a> for
        assistance in resetting your password.
      </p>
      <div>
        <p>
          Back to{' '}
          <a href={ROUTES.login} className={styles.link}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
