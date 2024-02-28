import React, { useState } from 'react';
import styles from './TimeTrackingPage.module.css'; // Oletetaan, että tämä tiedosto on luotu

const TimeTrackingPage = () => {
  const [workMatter, setWorkMatter] = useState('sick');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Tässä kohdassa voit käsitellä lomakkeen tietoja, esimerkiksi lähettää ne palvelimelle
    console.log({ workMatter, startDate, endDate, startTime, endTime });
  };

  return (
    <div className={styles.basePage}>
      <div className={styles.baseHeader}>
        <h1>Matti Meikäläinen</h1>
        <p>Graphic Designer</p>
      </div>

      {/* Oletetaan, että kalenterikomponentti on määritelty ja tyylitelty */}
      <div className={styles.calendar}></div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Work matter or absence:
          <select
            className={styles.select}
            value={workMatter}
            onChange={(e) => setWorkMatter(e.target.value)}
          >
            <option value="sick">Sick</option>
            {/* Lisää muita vaihtoehtoja tarpeen mukaan */}
          </select>
        </label>

        <label className={styles.label}>
          Starting date:
          <input
            className={styles.input}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Ending date:
          <input
            className={styles.input}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Starting time:
          <input
            className={styles.input}
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Ending time:
          <input
            className={styles.input}
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>

        <button className={styles.button} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default TimeTrackingPage;
