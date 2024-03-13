import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styles from './CompanySignUpPage.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '../../components/Footer';

const SignUpSchema = Yup.object().shape({
  companyName: Yup.string().required('Required'),
  businessId: Yup.string().required('Required'),
  allowedEmails: Yup.string().required('Required'),
  managerEmail: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

type SignUpFormValues = {
  companyName: string;
  businessId: string;
  allowedEmails: string;
  managerEmail: string;
  password: string;
  confirmPassword: string;
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
  };

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>Create Company</h2>

      <div className={styles.baseFormContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
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
                placeholder="Allowed Emails (comma separated)"
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
