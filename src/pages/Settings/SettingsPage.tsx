import { useUser } from '@/components/UserContext';
import styles from './SettingsPage.module.css';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import Footer from '../../components/Footer';
import InvitationLinkGenerator from '@/components/InviteButton';
import ProfileCard from '@/components/ProfileCard';

const SettingsPage = () => {
  const { logout, getUser } = useUser();
  const navigate = useNavigate();
  const user = getUser();

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />

      {/* Asetusvaihtoehdot */}
      <div className={styles.settingsOptions}>
        <button
          onClick={async () => {
            logout();
            navigate(ROUTES.dashboard);
          }}
          className="baseField"
        >
          Sign out
        </button>
        <button
          // onClick={/* Käsittelijä salasanan vaihdolle */}
          className="baseField"
        >
          Change password
        </button>
        <button
          // onClick={/* Käsittelijä profiilikuvan vaihdolle */}
          className="baseField"
        >
          Change profile picture
        </button>
        <button
          // onClick={/* Käsittelijä puhelinnumeron vaihdolle */}
          className="baseField"
        >
          Change phone number
        </button>
        <button
          // onClick={/* Käsittelijä kielen vaihdolle */}
          className="baseField"
        >
          Change Language
        </button>

        <InvitationLinkGenerator user={user} />
      </div>

      {/* Linkkejä lisätietoihin */}
      <div className={styles.additionalLinks}>
        <a href="mailto:support@clockwise.com" className={styles.link}>
          Report Problem via Email
        </a>
        <a href="/terms" className={styles.link}>
          Terms of Use
        </a>
        <a href="/privacy" className={styles.link}>
          Privacy Policy
        </a>
      </div>

      {/* Footer, oletetaan että tämä on yhteinen komponentti koko sovellukselle */}
      <footer className={styles.footer}>© ClockWise Corp 2024</footer>
      <Footer />
    </div>
  );
};

export default SettingsPage;
