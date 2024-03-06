import styles from './ProfileCard.module.css';

type ProfileCardProps = {
  name: string;
  title: string;
  imageUrl?: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, imageUrl }) => {
  return (
    <div className={styles.profileSection}>
      <img
        src={imageUrl}
        alt="Profile Picture"
        className={styles.profilePicture}
      />
      <h1 className={styles.profileName}>{name}</h1>
      <p className={styles.designation}>{title}</p>
    </div>
  );
};

export default ProfileCard;
