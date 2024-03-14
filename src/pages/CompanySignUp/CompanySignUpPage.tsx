import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styles from './CompanySignUpPage.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '@/components/Footer';
import { fetchGraphql } from '@/graphql/fetch';
import { createCompany, createManager } from '@/graphql/queries';

const SignUpSchema = Yup.object().shape({
  companyName: Yup.string().required('Required'),
  businessId: Yup.string().required('Required'),
  allowedEmails: Yup.string().required('Required'),
  managerEmail: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
});

type SignUpFormValues = {
  companyName: string;
  businessId: string;
  allowedEmails: string;
  managerEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  auth: string;
};

const CompanySignUpPage: React.FC = () => {
  const { getUser } = useUser();
  const user = getUser();
  const initialValues: SignUpFormValues = {
    companyName: '',
    businessId: '',
    allowedEmails: '',
    managerEmail: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    auth: '',
  };

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>Create Company</h2>

      <div className={styles.baseFormContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={async (values, actions) => {
            const allowedEmails = values.allowedEmails
              .split(',')
              .map((email) => {
                return '@' + email.trim();
              });

            if (
              !allowedEmails.includes('@' + values.managerEmail.split('@')[1])
            ) {
              actions.setErrors({
                auth: 'Manager email must match allowed emails.',
              });
              return;
            }

            const company = await fetchGraphql(
              createCompany,
              {
                input: {
                  name: values.companyName,
                  business_identity_code: values.businessId,
                  allowed_emails: allowedEmails,
                },
              },
              user.token,
            );

            if (!company) {
              actions.setErrors({ auth: 'Invalid company details.' });
              return;
            }

            const manager = await fetchGraphql(
              createManager,
              {
                input: {
                  email: values.managerEmail,
                  password: values.password,
                  first_name: values.firstName,
                  last_name: values.lastName,
                  language: 'en',
                  company_id: company.createCompany.id,
                },
              },
              user.token,
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
              <Field
                name="companyName"
                type="text"
                className={styles.baseField}
                placeholder="Company Name"
              />
              <Field
                name="businessId"
                type="text"
                className={styles.baseField}
                placeholder="Business ID"
              />
              <Field
                name="allowedEmails"
                type="text"
                className={styles.baseField}
                placeholder="example.com, example.org"
              />
              <Field
                name="firstName"
                type="text"
                className={styles.baseField}
                placeholder="Matti"
              />
              <Field
                name="lastName"
                type="text"
                className={styles.baseField}
                placeholder="Meikäläinen"
              />
              <Field
                name="managerEmail"
                className={styles.baseField}
                placeholder="Manager's Email Address"
              />
              <Field
                name="password"
                type="password"
                className={styles.baseField}
                placeholder="Password"
              />
              {errors.password !== 'Required' && touched.password && (
                <div className={styles.error}>{errors.password}</div>
              )}

              <Field
                name="confirmPassword"
                type="password"
                className={styles.baseField}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword !== 'Required' &&
                touched.confirmPassword && (
                  <div className={styles.error}>{errors.confirmPassword}</div>
                )}

              <button type="submit" className={styles.basePrimaryButton}>
                Create Company
              </button>

              {errors.auth && touched.auth ? (
                <div className={styles.error}>{errors.auth}</div>
              ) : null}

              {((errors.managerEmail && touched.managerEmail) ||
                (errors.businessId && touched.businessId) ||
                (errors.allowedEmails && touched.allowedEmails) ||
                (errors.companyName && touched.companyName)) && (
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

export default CompanySignUpPage;
