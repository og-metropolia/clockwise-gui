import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './SignupPage.module.css';
import ROUTES from '@/constants/routes';
import Logo from '@/components/Logo';
import { getCompanyEmails, signup } from '@/graphql/queries';
import { fetchGraphql } from '@/graphql/fetch';
import { USER_DEFAULTS } from '@/constants/userDefaults';
import { useUser } from '@/components/UserContext';
import { useNavigate } from 'react-router-dom';

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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
}

const SignupPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);

  const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
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
        onSubmit={async (values, actions) => {
          const companyEmails = (
            await fetchGraphql(getCompanyEmails, {
              companyId: searchParams.get('company'),
            })
          ).company.allowed_emails;

          const user = {
            input: {
              company: searchParams.get('company'),
              manager: searchParams.get('manager'),
              language: USER_DEFAULTS.language,
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              password: values.password,
            },
            email: values.email,
            password: values.password,
          };

          const userEmailSuffix = '@' + values.email.split('@')[1];
          if (!companyEmails.includes(userEmailSuffix)) {
            alert('Invalid domain for company email.');
            return;
          }

          const data = await fetchGraphql(signup, user);
          actions.setSubmitting(false);
          login(data.login).then(() => navigate(ROUTES.dashboard));
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.baseForm}>
            <Field
              name="firstName"
              type="firstName"
              placeholder="First Name"
              className={styles.baseField}
            />
            {errors.firstName && touched.firstName ? (
              <div className={styles.error}>{errors.firstName}</div>
            ) : null}

            <Field
              name="lastName"
              type="lastName"
              placeholder="Last Name"
              className={styles.baseField}
            />
            {errors.lastName && touched.lastName ? (
              <div className={styles.error}>{errors.lastName}</div>
            ) : null}

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
              autocomplete="new-password"
            />
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}

            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className={styles.baseField}
              autocomplete="new-password"
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
