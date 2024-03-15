import { useUser } from '@/components/UserContext';
import styles from './SettingsPage.module.css';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import Footer from '../../components/Footer';
import InvitationLinkGenerator from '@/components/InviteButton';
import ProfileCard from '@/components/ProfileCard';
import { Field, Form, Formik } from 'formik';
import { Language } from '@/types/user';
import { USER_DEFAULTS } from '@/constants/userDefaults';
import * as Yup from 'yup';
import { fetchGraphql } from '@/graphql/fetch';
import { updateUserMutation } from '@/graphql/queries';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const VISUAL_PASSWORD = '********';

const LANGUAGES = [
  {
    value: 'en',
    id: 'english',
  },
  {
    value: 'fi',
    id: 'finnish',
  },
  {
    value: 'sv',
    id: 'swedish',
  },
];

type UpdateUserFormValues = {
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  profilePicture: string;
  jobTitle: string;
  language: Language;
};

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { getUser, getToken, updateUser, logout } = useUser();
  const user = getUser();
  const [language, setLanguage] = useState<Language>(
    user?.language ?? USER_DEFAULTS.language,
  );

  const UpdateSchema = Yup.object().shape({
    password: Yup.string().required(t('settings.form.error.passwordRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('settings.form.error.passwordsMustMatch'))
      .required(t('settings.form.error.confirmPasswordRequired')),
    phoneNumber: Yup.string().required(
      t('settings.form.error.phoneNumberRequired'),
    ),
    profilePicture: Yup.string()
      .required('Required')
      .url(t('settings.form.error.invalidURL')),
    language: Yup.string()
      .required(t('settings.form.error.languageRequired'))
      .oneOf(LANGUAGES.map((type) => type.value)),
    jobTitle: Yup.string().required(t('settings.form.error.jobTitleRequired')),
  });

  const handleLanguageChange = (newLanguage: Language) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const initialValues: UpdateUserFormValues = {
    password: VISUAL_PASSWORD,
    confirmPassword: VISUAL_PASSWORD,
    phoneNumber: user?.phone ?? '',
    profilePicture: user?.profile_picture ?? '',
    jobTitle: user?.job_title ?? '',
    language: user?.language ?? USER_DEFAULTS.language,
  };

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>{t('settings.title')}</h2>
      <div className={styles.baseFormContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateSchema}
          onSubmit={async (values, actions) => {
            const updatedUser = {
              id: user?.id,
              input: {
                password:
                  values.password === VISUAL_PASSWORD
                    ? undefined
                    : values.password,
                phone: values.phoneNumber,
                profile_picture: values.profilePicture,
                language: language,
                job_title: values.jobTitle,
              },
            };

            const data = await fetchGraphql(
              updateUserMutation,
              updatedUser,
              getToken(),
            );

            if (data.updateUser) {
              updateUser(data.updateUser);
              actions.setSubmitting(false);
              alert(t('settings.alert.success'));
              window.location.reload();
            } else {
              actions.setSubmitting(false);
              alert(t('settings.alert.error'));
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.baseForm}>
              <label htmlFor="language" className={styles.baseFormLabel}>
                {t('settings.form.label.language')}
              </label>
              <FormControl fullWidth>
                <Select
                  name="language"
                  value={language}
                  onChange={(event) =>
                    handleLanguageChange(event.target.value as Language)
                  }
                  displayEmpty
                  className={styles.baseSelect}
                >
                  {LANGUAGES.map((lang) => (
                    <MenuItem key={lang.value} value={lang.value}>
                      {t(`settings.languages.${lang.id}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.language && touched.language ? (
                <div className={styles.error}>{errors.language}</div>
              ) : null}
              <label htmlFor="password" className={styles.baseFormLabel}>
                {t('settings.form.label.password')}
              </label>
              <Field
                name="password"
                type="password"
                placeholder={'*******'}
                className={styles.baseField}
              />
              {errors.password && touched.password ? (
                <div className={styles.error}>{errors.password}</div>
              ) : null}
              <label htmlFor="confirmPassword" className={styles.baseFormLabel}>
                {t('settings.form.label.confirmPassword')}
              </label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder={'******'}
                className={styles.baseField}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={styles.error}>{errors.confirmPassword}</div>
              ) : null}
              <label htmlFor="phoneNumber" className={styles.baseFormLabel}>
                {t('settings.form.label.phoneNumber')}
              </label>
              <Field
                name="phoneNumber"
                type="tel"
                placeholder={'+358 00 000 0000'}
                className={styles.baseField}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className={styles.error}>{errors.phoneNumber}</div>
              ) : null}
              <label htmlFor="profilePicture" className={styles.baseFormLabel}>
                {t('settings.form.label.profilePicture')}
              </label>
              <Field
                name="profilePicture"
                type="url"
                placeholder={'https://clockwise.me/image.jpg'}
                className={styles.baseField}
              />
              {errors.profilePicture && touched.profilePicture ? (
                <div className={styles.error}>{errors.profilePicture}</div>
              ) : null}
              <label htmlFor="jobTitle" className={styles.baseFormLabel}>
                {t('settings.form.label.jobTitle')}
              </label>
              <Field
                name="jobTitle"
                type="text"
                placeholder={'Designer'}
                className={styles.baseField}
              />
              {errors.jobTitle && touched.jobTitle ? (
                <div className={styles.error}>{errors.jobTitle}</div>
              ) : null}
              <button type="submit" className={styles.basePrimaryButton}>
                {t('settings.updateButton')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerButtons}>
          <button
            onClick={() => {
              logout();
              navigate(ROUTES.dashboard);
            }}
            className={styles.baseSecondaryButton}
          >
            {t('settings.signOutButton')}
          </button>
          {user?.role === 'MANAGER' && <InvitationLinkGenerator user={user} />}
        </div>

        <div className={styles.additionalLinks}>
          <a href="mailto:support@clockwise.com" className={styles.link}>
            {t('settings.reportProblem')}
          </a>
          <a href="/terms" className={styles.link}>
            {t('settings.termsOfUse')}
          </a>
          <a href="/privacy" className={styles.link}>
            {t('settings.privacyPolicy')}
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;
