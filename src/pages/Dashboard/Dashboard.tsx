import React from 'react';
import styles from './Dashboard.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '../../components/Footer';

const Dashboard: React.FC = () => {
  const { getUser } = useUser();
  const user = getUser();

  return (
    <div className={styles.basePage}>
      <ProfileCard name="Matti Meikäläinen" title="Graphic Designer" />
      <section className={styles.activity}>
        {/* Tähän voisi tulla dynaamista dataa liittyen käyttäjän aktiviteetteihin */}
        <div className={styles.activityItem}>
          <span>Monday 18</span>
          <span>In 9:00 am</span>
          <span>Out 5:00 pm</span>
        </div>
        {/* Lisää aktiviteettejä... */}
      </section>

      {/* {JSON.stringify(user, null, 2)} */}

      <Footer />
    </div>
  );
};

export default Dashboard;
