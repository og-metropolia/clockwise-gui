import React, { useState, useEffect } from 'react';
import './base.css'; // Tuo yleiset tyylit
import styles from './reportPage.module.css'; // Tuo sivukohtaiset tyylit

// Oletetaan, että sinulla on API-funktio, joka hakee työntekijän tunnit
import { getEmployeeHours } from '../api/employeeApi';

const ReportPage = () => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    // Haetaan työntekijän tunnit
    const fetchHours = async () => {
      const employeeHours = await getEmployeeHours();
      setHours(employeeHours);
    };

    fetchHours();
  }, []);

  // Lasketaan yhteen tunnit
  const totalHours = hours.reduce((sum, record) => sum + record.hours, 0);

  return (
    <div className={styles.basePage}>
      {/* Profiilin otsikko ja muut tiedot */}
      <div className={styles.profileSection}>
        <h1>Matti Meikäläinen</h1>
        <p>Graphic Designer</p>
      </div>

      {/* Tuntiraportti */}
      <div className={styles.reportSection}>
        {hours.map((record, index) => (
          <div key={index} className="baseField reportItem">
            <span>{record.date}</span>
            <span>{`${record.hours} hours`}</span>
          </div>
        ))}
        <div className="baseField totalHours">
          <span>Total: {totalHours} hours</span>
        </div>
      </div>

      {/* Footerin navigointi */}
      <footer className={styles.footer}>
        {/* Footer-navigointielementit */}
      </footer>
    </div>
  );
};

export default ReportPage;
