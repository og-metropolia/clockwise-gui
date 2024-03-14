import './DatePicker.css';
import styles from './Vacation.module.css';
import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Footer from '../../components/Footer';
import ProfileCard from '@/components/ProfileCard';
import { useUser } from '@/components/UserContext';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { DateRange, DayPicker } from 'react-day-picker';
import { fetchGraphql } from '@/graphql/fetch';
import { createEntryMutation } from '@/graphql/queries';

const ABSENCE_TYPES = [
  {
    value: 'sick_leave',
    label: 'Sick leave',
  },
  {
    value: 'sick_child',
    label: 'Sick child',
  },
  {
    value: 'holiday_leave',
    label: 'Holiday leave',
  },
  {
    value: 'special_leave',
    label: 'Special leave',
  },
  {
    value: 'unpaid_leave',
    label: 'Unpaid leave',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const VacationFormSchema = Yup.object().shape({
  absenceType: Yup.string()
    .required('Required')
    .oneOf(ABSENCE_TYPES.map((type) => type.value)),
});

interface VacationFormValues {
  absenceType: string;
}

const VacationPage: React.FC = () => {
  const { getUser, getToken } = useUser();
  const user = getUser();
  const [range, setRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [absences, setAbsences] = useState<Date[]>([]);
  const [reason, setReason] = useState('');

  const initialValues: VacationFormValues = {
    absenceType: '',
  };

  const handleSubmit = async () => {
    if (range.from && range.to) {
      const start = new Date(range.from);
      const end = new Date(range.to);
      let current = start;
      const newAbsences: Date[] = [];

      while (current <= end) {
        newAbsences.push(current);
        current = new Date(current.setDate(current.getDate() + 1));
      }

      setAbsences([...absences, ...newAbsences]);

      fetchGraphql(
        createEntryMutation,
        {
          input: {
            type: reason,
            start_timestamp: start.toISOString(),
            end_timestamp: end.toISOString(),
          },
        },
        getToken(),
      ).then(() => {
        window.location.reload();
      });
    }
  };

  const today = new Date();

  const handleSelect = (newRange: DateRange | undefined) => {
    if (newRange === range) setRange({ from: undefined, to: undefined });
    if (!newRange) return;
    setRange({
      from: newRange.from ?? undefined,
      to: newRange.to ?? undefined,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.basePage}>
        <ProfileCard user={user} />
        <h2 className={styles.baseTitle}>Absences</h2>
        <DayPicker
          mode="range"
          defaultMonth={today}
          weekStartsOn={1}
          selected={range}
          onSelect={handleSelect}
          modifiersClassNames={{
            selected: 'calendar-selected',
            today: 'calendar-today',
          }}
        />

        <div className={styles.baseFormContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={VacationFormSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className={styles.baseForm}>
                <DatePicker
                  label="Starting date"
                  value={range?.from}
                  className={styles.baseSelect}
                  onChange={(newDate) =>
                    setRange({ ...range, from: newDate ?? undefined })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="Ending date"
                  value={range?.to}
                  minDate={range?.from}
                  className={styles.baseSelect}
                  onChange={(newDate) =>
                    setRange({ ...range, to: newDate ?? undefined })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormControl fullWidth>
                  <InputLabel id="reason-label">Reason for absence</InputLabel>
                  <Select
                    name="absenceType"
                    labelId="reason-label"
                    label="Reason for absence"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    className={styles.baseSelect}
                  >
                    {ABSENCE_TYPES.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>

                  {!reason && errors && touched ? (
                    <div className={styles.error}>{errors.absenceType}</div>
                  ) : null}
                </FormControl>
                <button
                  type="submit"
                  className={styles.basePrimaryButton}
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <Footer />
      </div>
    </LocalizationProvider>
  );
};

export default VacationPage;
