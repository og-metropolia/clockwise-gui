import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './SignupPage.module.css';
import ROUTES from '@/constants/routes';
import Logo from '@/components/Logo';

// Rekisteröintilomakkeen validointisäännöt Yup-kirjastolla
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  termsAndConditions: Yup.bool().oneOf(
    [true],
    'You must accept the terms and conditions',
  ),
});

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
}

const SignupPage: React.FC = () => {
  const initialValues: RegisterFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false,
  };

  return (
    <div className={styles.basePage}>
      <Logo />
      <h1 className={styles.baseHeader}>Welcome to ClockWise</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          // Tässä voit käsitellä rekisteröinnin (esim. API-kutsu)
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.baseForm}>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className={styles.baseField}
            />
            {errors.email && touched.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className={styles.baseField}
            />
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}

            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className={styles.baseField}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className={styles.error}>{errors.confirmPassword}</div>
            ) : null}

            <label className={styles.checkboxContainer}>
              <Field
                type="checkbox"
                name="termsAndConditions"
                className={styles.checkbox}
              />
              <span>
                I agree to the Terms & Conditions & Privacy Policy set out by
                this site.
              </span>
            </label>
            {errors.termsAndConditions && touched.termsAndConditions ? (
              <div className={styles.error}>{errors.termsAndConditions}</div>
            ) : null}
            <button type="submit" className={styles.button}>
              Register
            </button>
          </Form>
        )}
      </Formik>
      <div className={styles.footer}>
        Already have an account?{' '}
        <a href={ROUTES.login} className={styles.link}>
          Login
        </a>
      </div>
    </div>
  );
};

export default SignupPage;
