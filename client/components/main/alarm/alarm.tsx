import styles from './alarm.module.css';

const Alarm = () => {
  return (
    <div className={styles.alarmContainer}>
      <div className={styles.bellContainer}>
        <span className={styles.notification}>1</span>
        <i className="fa-solid fa-bell fa-2x"></i>
      </div>
    </div>
  );
};

export default Alarm;
