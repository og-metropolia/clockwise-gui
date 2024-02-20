import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './loginPage.module.css'; // Oleta, että tämä on oikea polku CSS-moduuliisi
import logo from '../../assets/clockwise.png'; // Oleta, että tämä on oikea polku logollesi

// Kirjautumislomakkeen validointisäännöt Yup-kirjastolla
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

// Kirjautumislomakkeen tyypit TypeScriptille
interface LoginFormValues {
  email: string;
  password: string;
}

// Komponentti, joka renderöi kirjautumissivun
const LoginPage: React.FC = () => {
  const initialValues: LoginFormValues = { email: '', password: '' };

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="ClockWise Logo" className={styles.logo} />
      </div>
      <h1 className={styles.header}>
        Welcome Back <span className={styles.wave}>👋</span> to{' '}
        <span className={styles.highlight}>ClockWise</span>
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
          <Form className={styles.form}>
            <Field
              name="email"
              type="email"
              placeholder="Email Address"
              className={styles.field}
            />
            {errors.email && touched.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className={styles.field}
            />
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}
            <button type="submit" className={styles.button}>
              Login
            </button>
            <div className={styles.linkContainer}>
              <a href="#" className={styles.link}>
                Forgot Password?
              </a>
            </div>
            <div className={styles.footer}>
              <p>
                Don't have an account?{' '}
                <a href="#" className={styles.link}>
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
