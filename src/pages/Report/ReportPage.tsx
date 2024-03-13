import { useState, useEffect } from 'react';
import styles from './ReportPage.module.css';
import Footer from '@/components/Footer';
import { useUser } from '@/components/UserContext';
import ProfileCard from '@/components/ProfileCard';
import dayjs, { Dayjs } from 'dayjs';
import { Box, List, ListItem } from '@mui/material';
import HoursIcon from '../../assets/hours.png';
import DateIcon from '../../assets/date.png';
import { fetchGraphql } from '@/graphql/fetch';
import { getEntriesByType } from '@/graphql/queries';
import { Entry } from '@/types/user';

type EmployeeHours = {
  date: Dayjs;
  hours: number;
};

function formatHours(hours: number): string {
  const hourString = Math.floor(hours);
  const minuteString = Math.round((hours % 1) * 60);
  return `${hourString}:${minuteString.toString().padStart(2, '0')}`;
}

function formatDateWithSuffix(date: Dayjs) {
  const day = date.date();
  if (day % 10 === 1 && day !== 11) return `${date.format('dddd D')}st`;
  if (day % 10 === 2 && day !== 12) return `${date.format('dddd D')}nd`;
  if (day % 10 === 3 && day !== 13) return `${date.format('dddd D')}rd`;
  return `${date.format('dddd D')}th`;
}

const ReportPage = () => {
  const { getUser, getToken } = useUser();
  const user = getUser();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [hours, setHours] = useState<EmployeeHours[]>([]);
  const [month, setMonth] = useState(dayjs());

  useEffect(() => {
    const currentMonth = dayjs();
    fetchGraphql(
      getEntriesByType,
      {
        input: {
          type: 'working',
          min_timestamp: currentMonth.startOf('month').toISOString(),
          max_timestamp: currentMonth.endOf('month').toISOString(),
        },
      },
      getToken(),
    ).then((results) => {
      setEntries(results?.entriesByType);
    });
  }, []);

  useEffect(() => {
    const hoursByDay: { [key: string]: number } = entries.reduce(
      (acc: { [key: string]: number }, entry: any) => {
        const date = dayjs(entry.start_timestamp).format('YYYY-MM-DD');
        const hours = acc[date] ?? 0;
        acc[date] =
          hours +
          dayjs(entry.end_timestamp).diff(
            dayjs(entry.start_timestamp),
            'hour',
            true,
          );
        return acc;
      },
      {},
    );
    setHours(
      Object.entries(hoursByDay).map(([date, hours]) => ({
        date: dayjs(date),
        hours,
      })),
    );
  }, [entries]);

  const handleMonthChange = (date: Dayjs) => {
    setMonth(date);

    fetchGraphql(
      getEntriesByType,
      {
        input: {
          type: 'working',
          min_timestamp: date.startOf('month').toISOString(),
          max_timestamp: date.endOf('month').toISOString(),
        },
      },
      getToken(),
    ).then((results) => {
      setEntries(results?.entriesByType);
    });
  };

  const totalHours = hours.reduce((sum, record) => sum + record.hours, 0);

  const isCurrentMonth = month.isSame(dayjs(), 'month');

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>Report</h2>
      <div className={styles.reportFormContainer}>
        <div className={styles.monthSwitcher}>
          <button
            className={styles.baseSecondaryButton}
            onClick={() => handleMonthChange(month.subtract(1, 'month'))}
          >
            {'< '}
          </button>
          <p className={styles.monthText}>{month.format('MMMM YYYY')}</p>
          <button
            className={styles.baseSecondaryButton}
            onClick={() => handleMonthChange(month.add(1, 'month'))}
            disabled={isCurrentMonth}
          >
            {' >'}
          </button>
        </div>
        <div className={styles.totalHours}>
          <p>Total: {formatHours(totalHours)} hours</p>
        </div>
        <div className={styles.hoursListContainer}>
          <ListItem key={0} className={styles.hoursListHeader}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <img
                src={DateIcon}
                className={styles.hoursListIcon}
                alt="date icon"
              />
              <img
                src={HoursIcon}
                className={styles.hoursListIcon}
                alt="hours icon"
              />
            </Box>
          </ListItem>
          <hr className={styles.separator} />
          <List className={styles.hoursList}>
            {hours.map((date, index) => (
              <ListItem key={index} className={styles.hoursListItem}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <p>{formatDateWithSuffix(date.date)}</p>
                  <p>{formatHours(date.hours)}</p>
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

export default ReportPage;
