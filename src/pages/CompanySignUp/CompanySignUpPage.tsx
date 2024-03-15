import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styles from './CompanySignUpPage.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '@/components/Footer';
import { fetchGraphql } from '@/graphql/fetch';
import { createCompany } from '@/graphql/queries';

const CompanySignUpSchema = Yup.object().shape({
  companyName: Yup.string().required('Required'),
  businessId: Yup.string().required('Required'),
  allowedEmails: Yup.string().required('Required'),
});

type CompanySignUpFormValues = {
  companyName: string;
  businessId: string;
  allowedEmails: string;
  auth: string;
};

const CompanySignUpPage: React.FC = () => {
  const { getUser, getToken } = useUser();
  const user = getUser();
  const companyInitialValues: CompanySignUpFormValues = {
    companyName: '',
    businessId: '',
    allowedEmails: '',
    auth: '',
  };

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>Create Company</h2>

      <div className={styles.baseFormContainer}>
        <Formik
          initialValues={companyInitialValues}
          validationSchema={CompanySignUpSchema}
          onSubmit={async (values, actions) => {
            const token = getToken();

            const allowedEmails = values.allowedEmails
              .split(',')
              .map((email) => {
                return '@' + email.trim();
              });

            const company = await fetchGraphql(
              createCompany,
              {
                input: {
                  name: values.companyName,
                  business_identity_code: values.businessId,
                  allowed_emails: allowedEmails,
                },
              },
              token,
            );

            if (!company) {
              actions.setErrors({ auth: 'Invalid company details.' });
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

              <button type="submit" className={styles.basePrimaryButton}>
                Create Company
              </button>

              {errors.auth && touched.auth ? (
                <div className={styles.error}>{errors.auth}</div>
              ) : null}

              {((errors.businessId && touched.businessId) ||
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
