import { useUser } from '@/components/UserContext';
import styles from './SettingsPage.module.css';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import Footer from '../../components/Footer';
import InvitationLinkGenerator from '@/components/InviteButton';
import ProfileCard from '@/components/ProfileCard';
import { Field, Form, Formik } from 'formik';
import { Language, LoginUser } from '@/types/user';
import { USER_DEFAULTS } from '@/constants/userDefaults';
import * as Yup from 'yup';
import { fetchGraphql } from '@/graphql/fetch';
import { updateUserMutation } from '@/graphql/queries';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const LANGUAGE_OPTIONS = ['en', 'fi', 'sv'];
const VISUAL_PASSWORD = '********';

const UpdateSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  phoneNumber: Yup.string().required('Required'),
  profilePicture: Yup.string().required('Required').url('Invalid URL'),
  language: Yup.string().required('Required').oneOf(LANGUAGE_OPTIONS),
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

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout, getUser, getToken, updateUser } = useUser();
  const user = getUser();

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

      <div className={styles.updateSettingsContainer}>
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

            const data = (await fetchGraphql(
              updateUserMutation,
              updatedUser,
              getToken(),
            )) as { updateUser: LoginUser };

            updateUser(data.updateUser);
            actions.setSubmitting(false);
            navigate(ROUTES.settings);
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.baseForm}>
              <FormControl fullWidth className={styles.languageContainer}>
                <InputLabel id="language-label">Language</InputLabel>
                <Field
                  name="language"
                  as={Select}
                  labelId="language-label"
                  defaultValue={user?.language ?? USER_DEFAULTS.language}
                  className={styles.languageSelect}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="fi">Finnish</MenuItem>
                  <MenuItem value="sv">Swedish</MenuItem>
                </Field>
              </FormControl>
              {errors.language && touched.language ? (
                <div className={styles.error}>{errors.language}</div>
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

              <Field
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                className={styles.baseField}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className={styles.error}>{errors.phoneNumber}</div>
              ) : null}

              <Field
                name="profilePicture"
                type="url"
                placeholder="Profile Picture"
                className={styles.baseField}
              />
              {errors.profilePicture && touched.profilePicture ? (
                <div className={styles.error}>{errors.profilePicture}</div>
              ) : null}

              <Field
                name="jobTitle"
                type="text"
                placeholder="Job Title"
                className={styles.baseField}
              />
              {errors.jobTitle && touched.jobTitle ? (
                <div className={styles.error}>{errors.jobTitle}</div>
              ) : null}

              <button type="submit" className={styles.baseField}>
                Update Settings
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerButtons}>
          <button
            onClick={async () => {
              logout();
              navigate(ROUTES.dashboard);
            }}
            className={styles.baseField}
          >
            Sign out
          </button>
          {user?.role === 'MANAGER' ? (
            <InvitationLinkGenerator user={user} />
          ) : null}
        </div>

        <div className={styles.additionalLinks}>
          <a href="mailto:support@clockwise.com" className={styles.link}>
            Report Problem
          </a>
          <a href="/terms" className={styles.link}>
            Terms of Use
          </a>
          <a href="/privacy" className={styles.link}>
            Privacy Policy
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;
