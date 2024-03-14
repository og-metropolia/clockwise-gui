import styles from './ReportPage.module.css';
import Footer from '@/components/Footer';
import Report from '@/components/Report';
import { useUser } from '@/components/UserContext';
import ProfileCard from '@/components/ProfileCard';
import { useTranslation } from 'react-i18next';

const ReportPage = () => {
  const { t } = useTranslation();
  const { getUser, getToken } = useUser();
  const user = getUser();

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>{t('report.title')}</h2>
      <Report userId={user.id} token={getToken()} />
      <Footer />
    </div>
  );
};

export default ReportPage;
