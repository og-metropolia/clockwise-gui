import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isWeekend,
} from 'date-fns';
import styles from './Calendar.module.css';

const Calendar = ({ currentYear, currentMonth, absences }) => {
  const start = startOfMonth(new Date(currentYear, currentMonth));
  const end = endOfMonth(new Date(currentYear, currentMonth));
  const daysArray = eachDayOfInterval({ start: start, end: end });

  const dayClass = (day) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const isAbsent = absences.some(
      (absenceDate) => absenceDate === formattedDate,
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
