import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styles from './ManagerSignupPage.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '@/components/Footer';
import { fetchGraphql } from '@/graphql/fetch';
import { createManager, getCompanyByBic } from '@/graphql/queries';

const ManagerSignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  businessId: Yup.string().required('Required'),
});

type ManagerSignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  businessId: string;
  auth: string;
};

const ManagerSignUpPage: React.FC = () => {
  const { getUser, getToken } = useUser();
  const user = getUser();

  const managerInitialValues: ManagerSignUpFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    businessId: '',
    auth: '',
  };

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>Add Manager</h2>

      <div className={styles.baseFormContainer}>
        <Formik
          initialValues={managerInitialValues}
          validationSchema={ManagerSignUpSchema}
          onSubmit={async (values, actions) => {
            const token = getToken();

            const company = (
              await fetchGraphql(getCompanyByBic, {
                business_identity_code: values.businessId,
              })
            )?.companiesByBic;

            if (!company) {
              actions.setErrors({ auth: 'Invalid company.' });
              return;
            }

            const allowedEmails = company?.allowed_emails;
            if (!allowedEmails.includes('@' + values.email.split('@')[1])) {
              actions.setErrors({
                auth: 'Manager email must match allowed emails.',
              });
              return;
            }

            const manager = await fetchGraphql(
              createManager,
              {
                input: {
                  email: values.email,
                  password: values.password,
                  first_name: values.firstName,
                  last_name: values.lastName,
                  language: 'en',
                  company: company.id,
                },
              },
              token,
            );

            if (!manager) {
              actions.setErrors({ auth: 'Invalid manager details.' });
              return;
            }

            actions.setSubmitting(false);
            window.location.reload();
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.baseForm}>
              <label htmlFor="businessId" className={styles.baseFormLabel}>
                Business Identity Code
              </label>
              <Field
                id="businessId"
                name="businessId"
                type="text"
                className={styles.baseField}
                placeholder="00000000000"
              />
              <label htmlFor="firstName" className={styles.baseFormLabel}>
                First Name
              </label>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                className={styles.baseField}
                placeholder="Matti"
              />
              <label htmlFor="lastName" className={styles.baseFormLabel}>
                Last Name
              </label>
              <Field
                id="lastName"
                name="lastName"
                type="text"
                className={styles.baseField}
                placeholder="Meikäläinen"
              />
              <label htmlFor="email" className={styles.baseFormLabel}>
                Email
              </label>
              <Field
                id="email"
                name="email"
                autoComplete="new-email"
                className={styles.baseField}
                placeholder="matti@clockwisee.me"
              />
              <label htmlFor="password" className={styles.baseFormLabel}>
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className={styles.baseField}
                placeholder="********"
              />
              {errors.password !== 'Required' && touched.password && (
                <div className={styles.error}>{errors.password}</div>
              )}

              <label htmlFor="confirmPassword" className={styles.baseFormLabel}>
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={styles.baseField}
                placeholder="********"
              />

              {errors.confirmPassword !== 'Required' &&
                touched.confirmPassword && (
                  <div className={styles.error}>{errors.confirmPassword}</div>
                )}

              <button type="submit" className={styles.basePrimaryButton}>
                Add Manager
              </button>

              {errors.auth && touched.auth ? (
                <div className={styles.error}>{errors.auth}</div>
              ) : null}

              {((errors.email && touched.email) ||
                (errors.businessId && touched.businessId) ||
                (errors.firstName && touched.firstName) ||
                (errors.lastName && touched.firstName)) && (
                <div className={styles.error}>
                  {'You have empty required fields'}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
};

export default ManagerSignUpPage;
