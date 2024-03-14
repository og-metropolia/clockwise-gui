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

const VISUAL_PASSWORD = '********';

const LANGUAGES = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'fi',
    label: 'Finnish',
  },
  {
    value: 'sv',
    label: 'Swedish',
  },
];

const UpdateSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  phoneNumber: Yup.string().required('Required'),
  profilePicture: Yup.string().required('Required').url('Invalid URL'),
  language: Yup.string()
    .required('Required')
    .oneOf(LANGUAGES.map((type) => type.value)),
  jobTitle: Yup.string().required('Required'),
});

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

  const handleLanguageChange = (newLanguage: Language) => {
    i18n.changeLanguage(newLanguage);
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
                language: values.language,
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
              navigate(ROUTES.settings);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.baseForm}>
              <FormControl fullWidth>
                <Select
                  name="language"
                  value={initialValues.language}
                  onChange={(event) =>
                    handleLanguageChange(event.target.value as Language)
                  }
                  displayEmpty
                  className={styles.baseSelect}
                >
                  {LANGUAGES.map((lang) => (
                    <MenuItem key={lang.value} value={lang.value}>
                      {t(`settings.languages.${lang.label.toLowerCase()}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.language && touched.language ? (
                <div className={styles.error}>{errors.language}</div>
              ) : null}
              <Field
                name="password"
                type="password"
                placeholder={t('settings.form.placeholder.password')}
                className={styles.baseField}
              />
              {errors.password && touched.password ? (
                <div className={styles.error}>{errors.password}</div>
              ) : null}
              <Field
                name="confirmPassword"
                type="password"
                placeholder={t('settings.form.placeholder.confirmPassword')}
                className={styles.baseField}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={styles.error}>{errors.confirmPassword}</div>
              ) : null}
              <Field
                name="phoneNumber"
                type="tel"
                placeholder={t('settings.form.placeholder.phoneNumber')}
                className={styles.baseField}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className={styles.error}>{errors.phoneNumber}</div>
              ) : null}
              <Field
                name="profilePicture"
                type="url"
                placeholder={t('settings.form.placeholder.profilePicture')}
                className={styles.baseField}
              />
              {errors.profilePicture && touched.profilePicture ? (
                <div className={styles.error}>{errors.profilePicture}</div>
              ) : null}
              <Field
                name="jobTitle"
                type="text"
                placeholder={t('settings.form.placeholder.jobTitle')}
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
