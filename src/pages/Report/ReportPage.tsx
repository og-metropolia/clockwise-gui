import { useState, useEffect } from 'react';
import styles from './ReportPage.module.css'; // Tuo sivukohtaiset tyylit
import Footer from '@/components/Footer';
import { useUser } from '@/components/UserContext';
import ProfileCard from '@/components/ProfileCard';
import dayjs, { Dayjs } from 'dayjs';
import { Box, List, ListItem } from '@mui/material';
import HoursIcon from '../../assets/hours.png';
import DateIcon from '../../assets/date.png';

type EmployeeHours = {
  date: Dayjs;
  hours: number;
};

// TODO: Temporary mock data
const getEmployeeHours = async () => {
  return [
    { date: dayjs(), hours: 8 },
    { date: dayjs().add(1, 'day'), hours: 1.5 },
    { date: dayjs().add(2, 'day'), hours: 8.22 },
    { date: dayjs().add(3, 'day'), hours: 8.0 },
    { date: dayjs().add(4, 'day'), hours: 8.5 },
    { date: dayjs().add(5, 'day'), hours: 8.5 },
  ];
};

function formatHours(hours: number): string {
  const hourString = Math.floor(hours);
  const minuteString = Math.round((hours % 1) * 60);
  return `${hourString}:${minuteString.toString().padStart(2, '0')}`;
}

function formatDateWithSuffix(date: Dayjs) {
  const day = date.date();
  let suffix = 'th';

  if (day % 10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    suffix = 'rd';
  }

  return date.format(`dddd D[${suffix}]`);
}

const ReportPage = () => {
  const { getUser } = useUser();
  const user = getUser();
  const [hours, setHours] = useState<EmployeeHours[]>([]);
  const [month, setMonth] = useState(dayjs());

  useEffect(() => {
    const fetchHours = async () => {
      const employeeHours = await getEmployeeHours();
      setHours(employeeHours);
    };

    fetchHours();
  }, []);

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
            onClick={() => setMonth(month.subtract(1, 'month'))}
          >
            {'< '}
          </button>
          <p className={styles.monthText}>{month.format('MMMM YYYY')}</p>
          <button
            className={styles.baseSecondaryButton}
            onClick={() => setMonth(month.add(1, 'month'))}
            disabled={isCurrentMonth}
          >
            {' >'}
          </button>
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
        <div className={styles.totalHours}>
          <p>Total hours: {formatHours(totalHours)}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportPage;
