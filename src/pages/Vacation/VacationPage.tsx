import { useState } from 'react';
import Calendar from '../../components/Calendar';
import WorkMatterOrAbsence from '../../components/WorkMatterOrAbsence';
import styles from './Vacation.module.css';
import Footer from '../../components/Footer';

const VacationPage = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [currentMonth] = useState(new Date().getMonth());
  const [absences, setAbsences] = useState([]);

  const addAbsences = (newAbsences) => {
    setAbsences(absences.concat(newAbsences));
  };

  return (
    <div className={styles.basePage}>
      <Calendar
        currentYear={currentYear}
        currentMonth={currentMonth}
        absences={absences}
      />
      <WorkMatterOrAbsence setAbsences={addAbsences} />
      <Footer />
    </div>
  );
};

export default VacationPage;
