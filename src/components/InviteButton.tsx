import { LoginUser } from '@/types/user';
import styles from './InviteButton.module.css';

const InvitationLinkGenerator = ({ user }: { user: LoginUser }) => {
  const generateLink = async () => {
    if (!navigator.clipboard || !user.id || !user.company.id) return;

    const registrationLink =
      import.meta.env.VITE_BASE_URL +
      'signup?company=' +
      user.company.id +
      '&manager=' +
      user.id;
    await navigator.clipboard.writeText(registrationLink);
  };

  return (
    <button className={styles.baseSecondaryButton} onClick={generateLink}>
      Invite to Company
    </button>
  );
};

export default InvitationLinkGenerator;
