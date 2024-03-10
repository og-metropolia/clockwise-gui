import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Typography, List, ListItem, Paper, Box } from '@mui/material';
import styles from './Dashboard.module.css'; // Oletetaan, että yhteisiä tyylejä on päivitetty tai lisätty
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '../../components/Footer';
import CheckInIcon from '../../assets/checkin.png';
import CheckOutIcon from '../../assets/checkout.png';

const Dashboard = () => {
  const { getUser } = useUser();
  const user = getUser();
  const [checkInTime, setCheckInTime] = useState<Dayjs | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Dayjs | null>(null);
  const [activities, setActivities] = useState<{ in: Dayjs; out?: Dayjs }[]>(
    [],
  );
  const [activityDate, setActivityDate] = useState(dayjs());

  const handleCheckInClick = () => {
    const now = dayjs();

    setCheckInTime(now);
    setCheckOutTime(null);
  };

  const handleCheckOutClick = () => {
    const now = dayjs();

    if (!!checkInTime) {
      setCheckOutTime(now);
      setActivities(activities.concat([{ in: checkInTime, out: now }]));
    }
    setCheckInTime(null);
  };

  const canNavigateForward = activityDate.isBefore(dayjs(), 'day');

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>Time Log</h2>
      <div className={styles.dashboardFormContainer}>
        <div className={styles.checkButtonContainer}>
          <button
            className={styles.checkInButton}
            onClick={handleCheckInClick}
            disabled={!!checkInTime && !checkOutTime}
          >
            <Typography variant="h6">
              {checkInTime ? 'Checked In' : 'Check In'}
            </Typography>
            {checkInTime && (
              <p className={styles.checkButtonSubtitle}>
                at {checkInTime.format('HH:mm')}
              </p>
            )}
          </button>
          <button
            className={styles.checkOutButton}
            onClick={handleCheckOutClick}
            disabled={!checkInTime || (!!checkInTime && !!checkOutTime)}
          >
            <Typography variant="h6">
              {checkOutTime ? 'Checked Out' : 'Check Out'}
            </Typography>
            {checkOutTime && (
              <p className={styles.checkButtonSubtitle}>
                at {checkOutTime.format('HH:mm')}
              </p>
            )}
          </button>
        </div>
        <h3 className={styles.activityHeader}>{`Your Activity`}</h3>
        <div className={styles.daySwitcher}>
          <button
            className={styles.baseSecondaryButton}
            onClick={() => setActivityDate(activityDate.subtract(1, 'day'))}
          >
            {'< '}
          </button>
          <p className={styles.todayText}>
            {activityDate.format('dddd, MMMM D')}
          </p>
          <button
            className={styles.baseSecondaryButton}
            onClick={() => setActivityDate(activityDate.add(1, 'day'))}
            disabled={!canNavigateForward}
          >
            {' >'}
          </button>
        </div>
        <div className={styles.activityListContainer}>
          <ListItem key={0} className={styles.activityListHeader}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <img
                src={CheckInIcon}
                className={styles.activityListIcon}
                alt="check in icon"
              />
              <img
                src={CheckOutIcon}
                className={styles.activityListIcon}
                alt="check out icon"
              />
            </Box>
          </ListItem>
          <hr className={styles.separator} />
          <List className={styles.activityList}>
            {activities.map((activity, index) => (
              <ListItem key={index} className={styles.activityListItem}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <p>{activity.in.format('HH:mm')}</p>
                  {activity.out && <p>→</p>}
                  {activity.out && <p>{activity.out.format('HH:mm')}</p>}
                </Box>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
