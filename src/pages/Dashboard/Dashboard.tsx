import React from 'react';
import styles from './Dashboard.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';

const Dashboard: React.FC = () => {
  const { getUser } = useUser();
  const user = getUser();

  

  // Tähän voi lisätä logiikkaa, kuten tilan hallintaa tai tapahtumankäsittelijöitä

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

      {JSON.stringify(user, null, 2)}

      {/* Footer, jossa navigointi (oletetaan, että tämä on yhteinen kaikille sivuille) */}
      <footer className={styles.footer}>
        {/* Navigointielementit tähän */}
      </footer>
    </div>
  );
};

export default Dashboard;
