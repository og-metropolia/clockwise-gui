import { LoginUser } from '@/types/user';
import styles from './InviteButton.module.css';
import { useTranslation } from 'react-i18next';

const InvitationLinkGenerator = ({ user }: { user: LoginUser }) => {
  const { t } = useTranslation();

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
      {t('settings.form.inviteButton.invite')}
    </button>
  );
};

export default InvitationLinkGenerator;
