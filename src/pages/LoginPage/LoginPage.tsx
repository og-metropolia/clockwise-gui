import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './loginPage.module.css';
import ROUTES from '@/constants/routes';
import Logo from '@/components/Logo';

// Kirjautumislomakkeen validointisäännöt Yup-kirjastolla
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const initialValues: LoginFormValues = { email: '', password: '' };

  return (
    <div className={styles.basePage}>
      <Logo />
      <h1 className={styles.baseHeader}>
        Welcome Back 👋 to <span className={styles.highlight}>ClockWise</span>
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
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
              // TODO
              <div className={styles.error}>
                {JSON.stringify(errors) + JSON.stringify(touched)}
              </div>
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
  );
};

export default LoginPage;
