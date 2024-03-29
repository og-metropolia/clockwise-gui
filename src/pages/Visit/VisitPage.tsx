import Footer from '@/components/Footer';
import styles from './VisitPage.module.css';
import { useParams } from 'react-router-dom';
import { useUser } from '@/components/UserContext';
import ProfileCard from '@/components/ProfileCard';
import { fetchGraphql } from '@/graphql/fetch';
import { getUserQuery } from '@/graphql/queries';
import { useEffect, useState } from 'react';
import { LoginUser } from '@/types/user';
import Report from '@/components/Report';
import { useTranslation } from 'react-i18next';

const VisitPage: React.FC = () => {
  const { employeeId } = useParams();
  const { getToken } = useUser();
  const [employee, setEmployee] = useState({} as LoginUser);
  const { t } = useTranslation();

  useEffect(() => {
    fetchGraphql(getUserQuery, { userId: employeeId }, getToken()).then(
      (result) => {
        setEmployee(result.user);
      },
    );
  }, []);

  return (
    <div className={styles.basePage}>
      <ProfileCard user={employee} />
      <h2 className={styles.baseTitle}>{t('visit.title')}</h2>
      <Footer />
      <Report userId={employeeId} token={getToken()} />
    </div>
  );
};
export default VisitPage;
