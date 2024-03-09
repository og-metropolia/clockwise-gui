import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './loginPage.module.css';
import ROUTES from '@/constants/routes';
import Logo from '@/components/Logo';
import { fetchGraphql } from '@/graphql/fetch';
import { loginQuery } from '@/graphql/queries';
import { useUser } from '@/components/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

interface LoginFormValues {
  email: string;
  password: string;
  auth: string;
}

const LoginPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = { email: '', password: '', auth: '' };

  return (
    <div className={styles.basePage}>
      <Logo />
      <h1 className={styles.baseHeader}>
        Welcome Back 👋 to <span className={styles.highlight}>ClockWise</span>
      </h1>
      <div className={styles.baseFormContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginFormSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false);
            const data = await fetchGraphql(loginQuery, values);
            if (!data?.login) {
              actions.setErrors({ auth: 'Invalid email or password' });
              return;
            }
            login(data.login).then(() => navigate(ROUTES.dashboard));
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.baseForm}>
              <Field
                name="email"
                type="email"
                placeholder="Email Address"
                className={styles.baseField}
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={styles.baseField}
              />
              <button type="submit" className={styles.button}>
                Login
              </button>
              {errors && touched ? (
                <div className={styles.error}>{errors.auth}</div>
              ) : null}
              <div className={styles.linkContainer}>
                <a href={ROUTES.resetPassword} className={styles.link}>
                  Forgot Password?
                </a>
              </div>
              <div className={styles.footer}>
                <p>
                  Don't have an account?{' '}
                  <a href={ROUTES.signup} className={styles.link}>
                    Register
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
    </div>
  </div>
  );
};

export default LoginPage;
