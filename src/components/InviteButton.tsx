const InvitationLinkGenerator = ({ user }: { user: any }) => {
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
    <div>
      <button className="baseField" onClick={generateLink}>
        Invite to Company
      </button>
    </div>
  );
};

export default InvitationLinkGenerator;
