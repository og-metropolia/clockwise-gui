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
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';


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
  const { t } = useTranslation();
  const [disabled, setDisabled] = React.useState(false);
  const searchParams = new URLSearchParams(window.location.search);

  const companyId = searchParams.get('company');
  const managerId = searchParams.get('manager');

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('signup.form.error.invalidEmail'))
      .required(t('signup.form.error.required')),
    password: Yup.string()
      .min(8, t('signup.form.error.shortPassword'))
      .required(t('signup.form.error.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('signup.form.error.passwordsMustMatch'))
      .required(t('signup.form.error.required')),
    termsAndConditions: Yup.bool().oneOf(
      [true],
      t('signup.form.error.termsAndConditions'),
    ),
  });

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
      <h1 className={styles.baseHeader}>{t('signup.title.welcome')}</h1>
      {disabled && (
        <p className={styles.warningText}>{t('signup.warning.inviteOnly')}</p>
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
              alert(t('signup.form.error.notAllowedEmail'));
              return;
            }
            const data = await fetchGraphql(signup, user);
            if (!data?.login) {
              actions.setErrors({
                auth: t('signup.form.error.invalidCredentials'),
              });
              return;
            }

            actions.setSubmitting(false);
            login(data.login).then(() => navigate(ROUTES.dashboard));
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.baseForm}>
              <label htmlFor="firstName" className={styles.baseFormLabel}>
                {t('signup.form.label.firstName')}
              </label>
              <Field
                id="firstName"
                name="firstName"
                type="firstName"
                placeholder="Matti"
                className={styles.baseField}
                disabled={disabled}
              />
              {errors.firstName && touched.firstName ? (
                <div className={styles.error}>{errors.firstName}</div>
              ) : null}

              <label htmlFor="lastName" className={styles.baseFormLabel}>
                {t('signup.form.label.lastName')}
              </label>
              <Field
                id="lastName"
                name="lastName"
                type="lastName"
                placeholder="Meikäläinen"
                className={styles.baseField}
                disabled={disabled}
              />
              {errors.lastName && touched.lastName ? (
                <div className={styles.error}>{errors.lastName}</div>
              ) : null}

              <label htmlFor="email" className={styles.baseFormLabel}>
                {t('signup.form.label.email')}
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="matti@clockwisee.me"
                className={styles.baseField}
                disabled={disabled}
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{errors.email}</div>
              ) : null}

              <label htmlFor="password" className={styles.baseFormLabel}>
                {t('signup.form.label.password')}
              </label>
              <Field
                id="password"
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

              <label htmlFor="confirmPassword" className={styles.baseFormLabel}>
                {t('signup.form.label.confirmPassword')}
              </label>
              <Field
                id="confirmPassword"
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
                <span>{t('signup.form.checkbox.termsAndConditions')}</span>
              </label>
              {errors.termsAndConditions && touched.termsAndConditions ? (
                <div className={styles.error}>{errors.termsAndConditions}</div>
              ) : null}
              <button
                type="submit"
                className={styles.basePrimaryButton}
                disabled={disabled}
              >
                {t('signup.form.button.register')}
              </button>
              {errors.auth && touched.auth ? (
                <div className={styles.error}>{errors.auth}</div>
              ) : null}

              <div className={styles.registerFormFooter}>
                <div className={styles.registerFormFooterBottomPart}>
                  <LanguageSwitcher />
                  <p className={styles.loginNavigation}>
                    {t('signup.form.footer.prompt')}
                    <a href={ROUTES.login} className={styles.link}>
                      {t('signup.form.footer.loginLink')}
                    </a>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
