import React, { useEffect } from 'react';
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
  auth: string;
}

const SignupPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [disabled, setDisabled] = React.useState(false);
  const searchParams = new URLSearchParams(window.location.search);

  const companyId = searchParams.get('company');
  const managerId = searchParams.get('manager');

  const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false,
    auth: '',
  };

  useEffect(() => {
    if (!companyId || !managerId) {
      setDisabled(true);
    }
  }, []);

  return (
    <div className={styles.basePageSecondary}>
      <Logo />
      <h1 className={styles.baseHeader}>Welcome to ClockWise</h1>
      {disabled && (
        <p className={styles.warningText}>
          Please use an invite link to register.
        </p>
      )}
      <div className={styles.baseFormContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={async (values, actions) => {
            const companyEmails = (
              await fetchGraphql(getCompanyEmails, {
                companyId: companyId,
              })
            ).company.allowed_emails;

            const user = {
              input: {
                company: companyId,
                manager: managerId,
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
            if (!data?.login) {
              actions.setErrors({ auth: 'Invalid email or password' });
              return;
            }

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
                disabled={disabled}
              />
              {errors.firstName && touched.firstName ? (
                <div className={styles.error}>{errors.firstName}</div>
              ) : null}

              <Field
                name="lastName"
                type="lastName"
                placeholder="Last Name"
                className={styles.baseField}
                disabled={disabled}
              />
              {errors.lastName && touched.lastName ? (
                <div className={styles.error}>{errors.lastName}</div>
              ) : null}

              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={styles.baseField}
                disabled={disabled}
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{errors.email}</div>
              ) : null}

              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={styles.baseField}
                autoComplete="new-password"
                disabled={disabled}
              />
              {errors.password && touched.password ? (
                <div className={styles.error}>{errors.password}</div>
              ) : null}

              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={styles.baseField}
                autoComplete="new-password"
                disabled={disabled}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={styles.error}>{errors.confirmPassword}</div>
              ) : null}

              <label className={styles.checkboxContainer}>
                <Field
                  type="checkbox"
                  name="termsAndConditions"
                  className={styles.checkbox}
                  disabled={disabled}
                />
                <span>
                  I agree to the Terms & Conditions & Privacy Policy set out by
                  this site.
                </span>
              </label>
              {errors.termsAndConditions && touched.termsAndConditions ? (
                <div className={styles.error}>{errors.termsAndConditions}</div>
              ) : null}
              <button
                type="submit"
                className={styles.basePrimaryButton}
                disabled={disabled}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
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
