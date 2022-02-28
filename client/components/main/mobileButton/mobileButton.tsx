import { Dispatch, SetStateAction, useState } from 'react';
import styles from './mobileButton.module.css';
import { Direction } from '../../type';
interface mobileType {
  setSlide: Dispatch<SetStateAction<string>>;
}
const MobileButton = ({ setSlide }: mobileType) => {
  const [mobile, setMobile] = useState<Direction>('up');
  const handleClick = () => {
    if (mobile === 'down') {
      setMobile('up');
    } else if (mobile === 'up') {
      setMobile('down');
    }
    setSlide(mobile);
  };
  return (
    <section className={styles.section}>
      <button className={styles.button} onClick={handleClick}>
        <i className="fa-solid fa-arrow-up"></i>
        <i className="fa-solid fa-arrow-down"></i>
      </button>
    </section>
  );
};

export default MobileButton;
