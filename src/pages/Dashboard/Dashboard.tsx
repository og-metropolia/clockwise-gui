import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Typography, List, ListItem, Box } from '@mui/material';
import styles from './Dashboard.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '../../components/Footer';
import CheckInIcon from '../../assets/checkin.png';
import CheckOutIcon from '../../assets/checkout.png';
import { fetchGraphql } from '@/graphql/fetch';
import { useTranslation } from 'react-i18next';
import {
  createEntryMutation,
  getEntriesByType,
  getLatestModifiedEntry,
  updateEntryMutation,
} from '@/graphql/queries';

const Dashboard = () => {
  const { getUser, getToken } = useUser();
  const user = getUser();
  const [checkInTime, setCheckInTime] = useState<Dayjs | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Dayjs | null>(null);
  const [entries, setEntries] = useState<{ in: Dayjs; out?: Dayjs }[]>([]);
  const [activityDate, setActivityDate] = useState(dayjs());
  const [entryId, setEntryId] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchGraphql(
      getLatestModifiedEntry,
      { input: { type: 'working' } },
      getToken(),
    ).then((result) => {
      if (
        dayjs(result?.entryLatestModified?.start_timestamp) >
          activityDate.startOf('day') &&
        !result?.entryLatestModified?.end_timestamp
      ) {
        setEntryId(result?.entryLatestModified?.id);
        setCheckInTime(dayjs(result?.entryLatestModified?.start_timestamp));
      }
    });
  }, []);

  useEffect(() => {
    fetchGraphql(
      getEntriesByType,
      {
        input: {
          user_id: user.id,
          type: 'working',
          min_timestamp: activityDate.startOf('day').toISOString(),
          max_timestamp: activityDate.endOf('day').toISOString(),
        },
      },
      getToken(),
    ).then((results) => {
      setEntries(
        results?.entriesByType
          .filter((entry: any) => !!entry)
          .map((entry: any) => ({
            in: dayjs(entry.start_timestamp),
            out: dayjs(entry.end_timestamp),
          })),
      );
    });
  }, []);

  const handleCheckInClick = async () => {
    const now = dayjs();
    setCheckInTime(now);
    setCheckOutTime(null);

    const result = await fetchGraphql(
      createEntryMutation,
      {
        input: {
          type: 'working',
          start_timestamp: now.toISOString(),
        },
      },
      getToken(),
    );

    setEntryId(result?.createEntry?.id);
  };

  const handleCheckOutClick = async () => {
    const now = dayjs();

    if (!!checkInTime) {
      setCheckOutTime(now);
      setEntries(entries.concat([{ in: checkInTime, out: now }]));
    }
    setCheckInTime(null);

    await fetchGraphql(
      updateEntryMutation,
      {
        id: entryId,
        input: {
          end_timestamp: now.toISOString(),
        },
      },
      getToken(),
    );

    setEntryId(null);
  };

  const handleDateChange = (date: Dayjs) => {
    setActivityDate(date);

    fetchGraphql(
      getEntriesByType,
      {
        input: {
          user_id: user.id,
          type: 'working',
          min_timestamp: date.startOf('day').toISOString(),
          max_timestamp: date.endOf('day').toISOString(),
        },
      },
      getToken(),
    ).then((results) => {
      setEntries(
        results?.entriesByType
          .filter((entry: any) => !!entry)
          .map((entry: any) => ({
            in: dayjs(entry.start_timestamp),
            out: dayjs(entry.end_timestamp),
          })),
      );
    });
  };

  const canNavigateForward = activityDate.isBefore(dayjs(), 'day');

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}> {t('dashboard.timeLog')}</h2>
      <div className={styles.dashboardFormContainer}>
        <div className={styles.checkButtonContainer}>
          <button
            className={styles.checkInButton}
            onClick={handleCheckInClick}
            disabled={!!checkInTime && !checkOutTime}
          >
            <Typography variant="h6">
              {checkInTime ? t('dashboard.checkedIn') : t('dashboard.checkIn')}
            </Typography>
            {checkInTime && (
              <p className={styles.checkButtonSubtitle}>
                {t('dashboard.checkedAt')} {checkInTime.format('HH:mm')}
              </p>
            )}
          </button>
          <button
            className={styles.checkOutButton}
            onClick={handleCheckOutClick}
            disabled={!checkInTime || (!!checkInTime && !!checkOutTime)}
          >
            <Typography variant="h6">
              {checkOutTime
                ? t('dashboard.checkedOut')
                : t('dashboard.checkOut')}
            </Typography>
            {checkOutTime && (
              <p className={styles.checkButtonSubtitle}>
                {t('dashboard.checkedAt')} {checkOutTime.format('HH:mm')}
              </p>
            )}
          </button>
        </div>
        <h3 className={styles.activityHeader}>{t('dashboard.yourActivity')}</h3>
        <div className={styles.daySwitcher}>
          <button
            className={styles.baseSecondaryButton}
            onClick={() => handleDateChange(activityDate.subtract(1, 'day'))}
          >
            {'< '}
          </button>
          <p className={styles.todayText}>
            {activityDate.format('DD.MM.YYYY')}
          </p>
          <button
            className={styles.baseSecondaryButton}
            onClick={() => handleDateChange(activityDate.add(1, 'day'))}
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
            {entries.map((activity, index) => (
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
