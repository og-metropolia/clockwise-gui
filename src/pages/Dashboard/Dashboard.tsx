import { useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  Box,
  ListItemText,
  Paper
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import styles from './Dashboard.module.css';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const { getUser } = useUser();
  const user = getUser();

  // Tila ajan tallentamiseksi ja aktiviteettien listalle
  const [checkInTime, setCheckInTime] = useState<Dayjs | null>(null);
  const [activities, setActivities] = useState<{ in: Dayjs; out?: Dayjs }[]>(
    [],
  );

  // Funktio joka kutsutaan, kun käyttäjä klikkaa 'Check In/Out' -painiketta
  const handleCheckInClick = () => {
    const now = dayjs();

    if (!checkInTime) {
      setCheckInTime(now); // Aseta 'Check In' aika, jos sitä ei ole vielä asetettu
    } else {
      // Lisää 'Check Out' aika ja tallenna aktiviteetti
      setActivities(activities.concat([{ in: checkInTime, out: now }]));
      setCheckInTime(null); // Nollaa 'Check In' aika seuraavaa kertaa varten
    }
  };
  const today = dayjs().format('dddd, MMMM D');

  // Funktio, joka määrittelee painikkeen värin tilan mukaan
  const getButtonColor = () => {
    return checkInTime ? 'success' : 'primary';
  };

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} className={styles.checkInOutButton}>
          <Button
            variant="contained"
            color={getButtonColor()}
            onClick={handleCheckInClick}
            sx={{ height: '100px', width: '100%' }}
          >
            <Box textAlign="center">
              <Typography variant="h5">
                {checkInTime ? 'Checked In' : 'Check In/Out'}
              </Typography>
              {checkInTime && (
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  In: {checkInTime.format('HH:mm')}
                </Typography>
              )}
            </Box>
          </Button>
        </Grid>
        <Grid item xs={12} className={styles.activityHeader}>
          <Typography variant="h6" component="div">
            Your Activity
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            {today}
          </Typography>
        </Grid>
        <Grid item xs={12} className={styles.activityList}>
          <Paper elevation={3}>
            <List>
              {activities.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`In: ${activity.in.format('HH:mm')}`}
                    secondary={
                      activity.out
                        ? `Out: ${activity.out.format('HH:mm')}`
                        : 'Currently In'
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Dashboard;
