import { USER_DEFAULTS } from '@/constants/userDefaults';
import styles from './ProfileCard.module.css';

type ProfileCardProps = {
  user: {
    first_name: string;
    last_name: string;
    job_title: string;
    profilePicture: string;
  } | null;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  if (!user) return null;
  return (
    <div className={styles.profileSection}>
      <img
        src={user.profilePicture}
        alt="Profile Picture"
        className={styles.profilePicture ?? USER_DEFAULTS.profilePicture}
      />
      <h1 className={styles.profileName}>
        {user.first_name + ' ' + user.last_name}
      </h1>
      <p className={styles.designation}>{user.job_title ?? ''}</p>
    </div>
  );
};

export default ProfileCard;
