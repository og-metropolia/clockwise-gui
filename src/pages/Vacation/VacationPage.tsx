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
import { format } from 'date-fns';

// TODO: get from API
const ABSENCE_TYPES = [
  {
    value: 'sick',
    label: 'Sick',
  },
  {
    value: 'unpaid',
    label: 'Unpaid leave',
  },
  {
    value: 'agreed',
    label: 'Agreed absence',
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
  const { getUser } = useUser();
  const user = getUser();
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [absences, setAbsences] = useState<Date[]>([]);
  const [reason, setReason] = useState('');

  const initialValues: VacationFormValues = {
    absenceType: '',
  };

  const handleSubmit = async (_values: any, _actions: any) => {
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
    }
  };

  const today = new Date();
  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }

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
        <DayPicker
          id="test"
          mode="range"
          defaultMonth={today}
          weekStartsOn={1}
          selected={range}
          footer={footer}
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
                {errors && touched ? (
                  <div className={styles.error}>{errors.absenceType}</div>
                ) : null}

                <DatePicker
                  label="Starting date"
                  value={range?.from}
                  maxDate={range?.to}
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
                </FormControl>
                <button type="submit" className={styles.basePrimaryButton}>
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
