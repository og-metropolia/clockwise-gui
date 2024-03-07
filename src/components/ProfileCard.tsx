import styles from './ProfileCard.module.css';
import DefaultProfilePicture from './icons/DefaultProfilePicture';

type ProfileCardProps = {
  user: {
    first_name: string;
    last_name: string;
    job_title: string;
    profile_picture?: string;
  } | null;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  if (!user) return null;
  return (
    <div className={styles.profileCard}>
      <div className={styles.profilePictureContainer}>
        {user.profile_picture ? (
          <img
            src={user.profile_picture}
            alt="Profile Picture"
            className={styles.profilePicture}
          />
        ) : (
          <DefaultProfilePicture />
        )}
      </div>
      <div className={styles.profileTextContainer}>
        <h1 className={styles.profileName}>
          {user.first_name + ' ' + user.last_name}
        </h1>
        <p className={styles.designation}>{user.job_title ?? ''}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
