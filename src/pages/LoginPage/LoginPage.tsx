import styles from './loginPage.module.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ROUTES from '@/constants/routes';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { fetchGraphql } from '@/graphql/fetch';
import { loginQuery } from '@/graphql/queries';
import { useUser } from '@/components/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('login.form.error.invalidEmail'))
      .required(t('login.form.error.required')),
    password: Yup.string().required(t('login.form.error.required')),
  });

  interface LoginFormValues {
    email: string;
    password: string;
    auth: string;
  }

  const initialValues: LoginFormValues = { email: '', password: '', auth: '' };

  return (
    <div className={styles.basePageSecondary}>
      <Logo />
      <h1 className={styles.baseHeader}>
        {t('login.title.welcome')}
        <span className={styles.highlight}>{t('login.title.companyName')}</span>
      </h1>
      <div className={styles.baseFormContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginFormSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false);
            const data = await fetchGraphql(loginQuery, values);
            if (!data?.login) {
              actions.setErrors({
                auth: t('login.form.error.invalidCredentials'),
              });
              return;
            }
            login(data.login).then(() => {
              data.login?.user?.role === 'MANAGER'
                ? navigate(ROUTES.managerDashboard)
                : navigate(ROUTES.dashboard);
            });
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.baseForm}>
              <label htmlFor="email" className={styles.baseFormLabel}>
                {t('login.form.label.email')}
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder={'matti@clockwisee.me'}
                className={styles.baseField}
              />
              {errors.email && touched.email ? (
                <div className={styles.error}>{errors.email}</div>
              ) : null}
              <label htmlFor="password" className={styles.baseFormLabel}>
                {t('login.form.label.password')}
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder={'*******'}
                className={styles.baseField}
              />
              {errors.password && touched.password ? (
                <div className={styles.error}>{errors.password}</div>
              ) : null}
              <button type="submit" className={styles.button}>
                {t('login.form.button.login')}
              </button>
              {errors.auth && touched.auth ? (
                <div className={styles.error}>{errors.auth}</div>
              ) : null}
              <div className={styles.loginFormFooter}>
                <p className={styles.linkContainer}>
                  <a href={ROUTES.resetPassword} className={styles.link}>
                    {t('login.form.link.forgotPassword')}
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={styles.loginFormFooterBottomPart}>
        <LanguageSwitcher />
        <p className={styles.registerNavigation}>
          {t('login.form.footer.prompt')}
          <a href={ROUTES.signup} className={styles.link}>
            {t('login.form.link.register')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
