import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './Vacation.module.css';
import Footer from '../../components/Footer';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import Calendar from '@/components/Calendar';
import { format } from 'date-fns';

const VacationPage = () => {
  const { getUser } = useUser();
  const user = getUser();

  // State has been explicitly typed here
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [absences, setAbsences] = useState<Date[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (startDate && endDate) {
      // Ensure both dates are not null
      const start = new Date(startDate);
      const end = new Date(endDate);
      let current = start;
      const newAbsences: Date[] = [];

      while (current <= end) {
        newAbsences.push(current);
        current = new Date(current.setDate(current.getDate() + 1));
      }

      setAbsences([...absences, ...newAbsences]); // Correctly typed array being spread into the state
    }
  };

  const today = new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={styles.basePage}>
        <ProfileCard user={user} />

        {/* Render the Calendar component with correct props */}
        <Calendar
          currentYear={startDate?.getFullYear() ?? today.getFullYear()}
          currentMonth={startDate?.getMonth() ?? today.getMonth()}
          absences={absences}
        />
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <DatePicker
            label="Starting date"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Ending date"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
        <Footer />
      </Box>
    </LocalizationProvider>
  );
};

export default VacationPage;
