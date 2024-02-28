import styles from './Logo.module.css';
import logo from '../assets/clockwise.png';

const Logo: React.FC = () => {
  return (
    <div>
      <img src={logo} alt="ClockWise Logo" className={styles.logo} />
    </div>
  );
};

export default Logo;
