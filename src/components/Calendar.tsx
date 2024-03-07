import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isWeekend,
} from 'date-fns';
import styles from './Calendar.module.css';

const Calendar = ({
  currentYear,
  currentMonth,
  absences,
}: {
  currentYear: number;
  currentMonth: number;
  absences: Date[];
}) => {
  const start = startOfMonth(new Date(currentYear, currentMonth));
  const end = endOfMonth(new Date(currentYear, currentMonth));
  const daysArray = eachDayOfInterval({ start: start, end: end });

  const dayClass = (day: Date) => {
    const isAbsent = absences.some(
      (absenceDate: Date) =>
        format(absenceDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'),
    );
    const isCurrentMonth = isSameMonth(
      day,
      new Date(currentYear, currentMonth),
    );
    const isWeekendDay = isWeekend(day);
    return `${isAbsent ? styles.absence : ''} ${isCurrentMonth ? '' : styles.otherMonth} ${isWeekendDay ? styles.weekend : ''}`;
  };

  return (
    <div className={styles.calendar}>
      {daysArray.map((date, index) => (
        <div key={index} className={`${styles.day} ${dayClass(date)}`}>
          {format(date, 'd')}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
