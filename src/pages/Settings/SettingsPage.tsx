import styles from './SettingsPage.module.css'; // Tuo sivukohtaiset tyylit

const SettingsPage = () => {
  return (
    <div className={styles.basePage}>
      {/* Profiilin otsikko ja kuva */}
      <div className={styles.profileSection}>
        <img
          src="/path/to/profile-picture.png"
          alt="Profile"
          className={styles.profilePicture}
        />
        <h1 className={styles.profileName}>Matti Meikäläinen</h1>
        <p className={styles.designation}>Graphic Designer</p>
      </div>

      {/* Asetusvaihtoehdot */}
      <div className={styles.settingsOptions}>
        <button
          // onClick={/* Käsittelijä kirjautumiselle */}
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
      </div>

      {/* Linkkejä lisätietoihin */}
      <div className={styles.additionalLinks}>
        <a href="/report-problem" className={styles.link}>
          Report Problem
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
    </div>
  );
};

export default SettingsPage;
