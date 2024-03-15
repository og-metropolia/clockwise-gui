import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styles from './CompanySignUpPage.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '@/components/Footer';
import { fetchGraphql } from '@/graphql/fetch';
import { createCompany } from '@/graphql/queries';
import { useTranslation } from 'react-i18next';

type CompanySignUpFormValues = {
  companyName: string;
  businessId: string;
  allowedEmails: string;
  auth: string;
};

const CompanySignUpPage: React.FC = () => {
  const { getUser, getToken } = useUser();
  const user = getUser();
  const { t } = useTranslation();

  const companyInitialValues: CompanySignUpFormValues = {
    companyName: '',
    businessId: '',
    allowedEmails: '',
    auth: '',
  };

  const CompanySignUpSchema = Yup.object().shape({
    companyName: Yup.string().required('Required'),
    businessId: Yup.string().required('Required'),
    allowedEmails: Yup.string().required('Required'),
  });

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>
        {t('companySignUpPage.createCompanyTitle')}
      </h2>

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
              actions.setErrors({
                auth: t('companySignUpPage.invalidCompanyDetails'),
              });
              return;
            }

            actions.setSubmitting(false);
            window.location.reload();
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.baseForm}>
              <label htmlFor="companyName" className={styles.baseFormLabel}>
                {t('companySignUpPage.companyNamePlaceholder')}
              </label>
              <Field
                id="companyName"
                name="companyName"
                type="text"
                className={styles.baseField}
                placeholder="ClockWise Inc."
              />
              <label htmlFor="businessId" className={styles.baseFormLabel}>
                {t('companySignUpPage.businessIdPlaceholder')}
              </label>
              <Field
                id="businessId"
                name="businessId"
                type="text"
                className={styles.baseField}
                placeholder="1234567-8"
              />
              <label htmlFor="allowedEmails" className={styles.baseFormLabel}>
                {t('companySignUpPage.allowedEmailsPlaceholder')}
              </label>
              <Field
                id="allowedEmails"
                name="allowedEmails"
                type="text"
                className={styles.baseField}
                placeholder="example.com, example.org"
              />

              <button type="submit" className={styles.basePrimaryButton}>
                {t('companySignUpPage.createCompanyButton')}
              </button>

              {errors.auth && touched.auth ? (
                <div className={styles.error}>{errors.auth}</div>
              ) : null}

              {((errors.businessId && touched.businessId) ||
                (errors.allowedEmails && touched.allowedEmails) ||
                (errors.companyName && touched.companyName)) && (
                <div className={styles.error}>
                  {t('companySignUpPage.emptyFieldsError')}
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
