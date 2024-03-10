import styles from './ProfileCard.module.css';
import DefaultProfilePicture from './icons/DefaultProfilePicture';
import { LoginUser } from '@/types/user';

type ProfileCardProps = {
  user: Pick<
    LoginUser,
    'first_name' | 'last_name' | 'profile_picture' | 'job_title'
  > | null;
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
        <h2 className={styles.profileName}>
          {user.first_name + ' ' + user.last_name}
        </h2>
        <p className={styles.designation}>{user.job_title ?? ''}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
