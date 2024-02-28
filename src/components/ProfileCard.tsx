import styles from './ProfileCard.module.css';

type ProfileCardProps = {
  name: string;
  title: string;
  imageUrl?: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, imageUrl }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{title}</p>
      <img src={imageUrl ?? '/profile-picture.png'} alt="profile picture" />
    </div>
  );
};

export default ProfileCard;
