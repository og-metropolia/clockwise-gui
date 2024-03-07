import React, { useState } from 'react';
import { parseISO, eachDayOfInterval, format } from 'date-fns';

const WorkMatterOrAbsence = ({ setAbsences }) => {
  const [absenceType, setAbsenceType] = useState('sick');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    if (!startDate || !endDate || !absenceType) return;

    // Muunna syötetyt päivämäärät Date-objekteiksi
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    // Luo lista poissaolopäivämääristä valitulla välillä
    const dateRange = eachDayOfInterval({ start, end })
      .map(date => format(date, 'yyyy-MM-dd'));

    // Kutsu setAbsences-funktiota uudella poissaololistalla
    setAbsences(dateRange);
  };

  return (
    <div>
      <select value={absenceType} onChange={e => setAbsenceType(e.target.value)}>
        <option value="sick">Sick</option>
        <option value="holiday">On Holiday</option>
        <option value="without_pay">Without pay</option>
      </select>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default WorkMatterOrAbsence;
