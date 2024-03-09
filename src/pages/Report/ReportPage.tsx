import { useState, useEffect } from 'react';
import '../../base.css';
import styles from './ReportPage.module.css'; // Tuo sivukohtaiset tyylit
import Footer from '@/components/Footer';
import { useUser } from '@/components/UserContext';
import ProfileCard from '@/components/ProfileCard';

// Oletetaan, että sinulla on API-funktio, joka hakee työntekijän tunnit
// import { getEmployeeHours } from '../api/employeeApi';

// TODO: Temporary mock data
const getEmployeeHours = async () => {
  return [
    { date: '2021-09-01', hours: 8 },
    { date: '2021-09-02', hours: 8 },
    { date: '2021-09-03', hours: 8 },
    { date: '2021-09-04', hours: 8 },
    { date: '2021-09-05', hours: 8 },
  ];
};

const ReportPage = () => {
  const { getUser } = useUser();
  const user = getUser();
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
      <ProfileCard user={user} />

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

      <Footer />
    </div>
  );
};

export default ReportPage;
